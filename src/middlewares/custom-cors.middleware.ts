import cors, { CorsOptions } from 'cors';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from '../loggers/console.logger';

export function customCors(
  corsConfig: CorsOptions
): (request: Request, res: Response, next: NextFunction) => void {
  let allowedOrigins: string[] = [];

  const allowedMethods: string[] =
    typeof corsConfig.methods === 'string'
      ? corsConfig.methods.split(',')
      : corsConfig.methods || ['GET', 'OPTIONS', 'POST'];
  const consoleLogger: Logger = ConsoleLogger.getLogger(customCors.name);
  const corsMiddleware = cors(corsConfig);

  if (corsConfig.origin)
    allowedOrigins = (corsConfig.origin as string).split(',');

  return (request, response, next) => {
    const host: string | undefined = request.header('Host');
    const method: string = request.method;
    const origin: string | undefined = request.header('origin');
    const userAgent: string | undefined = request.header('User-Agent');

    consoleLogger.verbose('Checking if client is GitHub...');

    if (allowedOrigins) {
      if (!allowedOrigins.includes((origin as string) || host!)) {
        consoleLogger.error(`Origin ${origin} is not allowed`);
        response.status(403).send('Forbidden');
        return;
      }
    }

    if (!allowedMethods.includes(method)) {
      consoleLogger.error(`Method ${method} is not allowed`);
      response.status(403).send('Forbidden');
      return;
    }

    consoleLogger.info(`Client host: ${host}`);

    if (process.env.NODE_ENV === 'production') {
      if (
        (origin !== 'https://api.github.com' &&
          host !== process.env.PUBLIC_HOST_ADDRESS) ||
        !userAgent ||
        !request.header('X-GitHub-Event')
      ) {
        consoleLogger.error('Client is not GitHub');
        response.status(403).send('Forbidden');
        return;
      }

      if (!userAgent.startsWith('GitHub-Hookshot/')) {
        consoleLogger.error('Client is not GitHub');
        response.status(403).send('Forbidden');
        return;
      }
    }

    corsMiddleware(request, response, next);
  };
}
