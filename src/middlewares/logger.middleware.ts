import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from '../loggers/console.logger';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const consoleLogger: Logger = ConsoleLogger.getLogger(logger.name);

  consoleLogger.info(
    `Request received: ${request.method} ${request.originalUrl} from ${request.ip}`
  );

  next();
}
