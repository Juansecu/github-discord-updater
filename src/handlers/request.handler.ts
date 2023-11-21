import { WebhookClient } from 'discord.js';
import { Request, Response } from 'express';
import { Logger } from 'winston';

import { IRequestHandler } from './typings/request.handler';

import { ConsoleLogger } from '../loggers/console.logger';

import { GollumEventHandler } from './gollum.event-handler';

export class RequestHandler implements IRequestHandler {
  private static readonly _CONSOLE_LOGGER: Logger = ConsoleLogger.getLogger(
    RequestHandler.name
  );

  public async handleRequest(
    request: Request,
    response: Response
  ): Promise<void> {
    const githubEvent: string = request.header('X-GitHub-Event') as string;
    const webhookClient: WebhookClient = new WebhookClient({
      id: process.env.WEBHOOK_ID as string,
      token: process.env.WEBHOOK_TOKEN as string
    });

    RequestHandler._CONSOLE_LOGGER.info(
      `Received ${githubEvent} event from GitHub`
    );

    if (githubEvent === GollumEventHandler.GITHUB_EVENT) {
      await new GollumEventHandler().handleEvent(
        webhookClient,
        request,
        response
      );
      return;
    }

    response.status(204).send();
  }
}
