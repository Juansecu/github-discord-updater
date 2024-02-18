import express, { Express, NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from './loggers/console.logger';

import { RequestHandler } from './handlers/request.handler';

import { checkEnvironmentVariables } from './check-environment-variables';

const app: Express = express();
const consoleLogger: Logger = ConsoleLogger.getLogger('main');
const port: string = process.env.PORT ?? '3000';

checkEnvironmentVariables();

app.post(
  '/:webhookId/:webhookToken',
  express.json({ type: 'application/json' }),
  checkIfClientIsGitHub,
  validateRequestBody,
  (request: Request, response: Response): void => {
    new RequestHandler().handleRequest(request, response);
  }
);

app.listen(port, (): void => {
  consoleLogger.info(`Listening on port ${port}`);
});

function checkIfClientIsGitHub(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  consoleLogger.verbose('Checking if client is GitHub...');

  if (process.env.NODE_ENV === 'production') {
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
    consoleLogger.info('Client is  not GitHub');
    response.status(403).send('Forbidden');
    return;
  }

  consoleLogger.verbose('Client is GitHub');

  next();
}

function validateRequestBody(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  consoleLogger.verbose('Validating request body...');

  if (!request.body) {
    consoleLogger.error('Request body is empty');
    response.status(400).send('Bad Request');
    return;
  }

  consoleLogger.verbose('Request body is not empty');

  next();
}
