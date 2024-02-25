import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from '../loggers/console.logger';

export function checkIfClientIsGitHub(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const consoleLogger: Logger = ConsoleLogger.getLogger(
    checkIfClientIsGitHub.name
  );

  consoleLogger.verbose('Checking if client is GitHub...');

  if (process.env.NODE_ENV === 'production') {
    consoleLogger.info(`Client host: ${request.get('host')}`);

    if (request.get('host') !== 'api.github.com') {
      consoleLogger.error('Client is not GitHub');
      response.status(403).send('Forbidden');
      return;
    }
  }

  if (!request.get('User-Agent') || !request.get('X-GitHub-Event')) {
    consoleLogger.error('Client is not GitHub');
    response.status(403).send('Forbidden');
    return;
  }

  if (!request.get('User-Agent')!.startsWith('GitHub-Hookshot/')) {
    consoleLogger.error('Client is  not GitHub');
    response.status(403).send('Forbidden');
    return;
  }

  consoleLogger.verbose('Client is GitHub');

  next();
}
