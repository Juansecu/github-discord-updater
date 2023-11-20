import { Request, Response } from 'express';
import { Logger } from 'winston';

import { IRequestHandler } from './typings/request.handler';

import { ConsoleLogger } from '../loggers/console.logger';
import { GollumEventHandler } from './gollum.event-handler';

export class RequestHandler implements IRequestHandler {
  private static readonly _CONSOLE_LOGGER: Logger = ConsoleLogger.getLogger(
    RequestHandler.name
  );

  public handleRequest(request: Request, response: Response): void {
    const githubEvent: string = request.header('X-GitHub-Event') as string;

    RequestHandler._CONSOLE_LOGGER.info(
      `Received ${githubEvent} event from GitHub`
    );

    if (githubEvent === GollumEventHandler.GITHUB_EVENT) {
      new GollumEventHandler().handleRequest(request, response);
      return;
    }

    response.status(204).send();
  }
}
