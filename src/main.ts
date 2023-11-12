import express, { Express, Request, Response } from 'express';

import { ConsoleLogger } from './loggers/console.logger';

import { RequestHandler } from './handlers/request.handler';

const app: Express = express();
const port: string = process.env.PORT ?? '3000';

app.post(
  'webhook',
  express.json({ type: 'application/json' }),
  (request: Request, response: Response): void => {
    new RequestHandler().handleRequest(request, response);
  }
);

app.listen(port, (): void => {
  ConsoleLogger.getLogger('main').info(`Listening on port ${port}`);
});
