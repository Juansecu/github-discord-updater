import { WebhookClient } from 'discord.js';
import { Request, Response } from 'express';
import { Logger } from 'winston';

import { IRequestHandler } from './typings/request.handler';
import { IWebhook } from './typings/webhook';

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
    const webhook: IWebhook = {
      webhookId: request.params.webhookId,
      webhookToken: request.params.webhookToken
    };
    const webhookClient: WebhookClient = new WebhookClient({
      id: webhook.webhookId,
      token: webhook.webhookToken
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
