import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from '../loggers/console.logger';

export function validateRequestBody(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const consoleLogger: Logger = ConsoleLogger.getLogger(
    validateRequestBody.name
  );

  consoleLogger.verbose('Validating request body...');

  if (!request.body) {
    consoleLogger.error('Request body is empty');
    response.status(400).send('Bad Request');
    return;
  }

  consoleLogger.verbose('Request body is not empty');

  next();
}
