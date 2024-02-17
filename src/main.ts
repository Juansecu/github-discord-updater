import express, { Express, NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

import { ConsoleLogger } from './loggers/console.logger';

import { RequestHandler } from './handlers/request.handler';

const app: Express = express();
const consoleLogger: Logger = ConsoleLogger.getLogger('main');
const port: string = process.env.PORT ?? '3000';

app.post(
  '/webhook',
  express.json({ type: 'application/json' }),
  checkIfClientIsGitHub,
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

  if (
    !request.get('hostname') ||
    !request.get('User-Agent') ||
    !request.get('X-GitHub-Event')
  ) {
    consoleLogger.error('Client is not GitHub');
    response.status(403).send('Forbidden');
    return;
  }

  if (
    request.get('hostname') === 'GitHub' &&
    request.get('User-Agent')!.startsWith('GitHub-Hookshot/') &&
    request.get('X-GitHub-Event')
  ) {
    consoleLogger.info('Client is GitHub');
    next();
  }
}
