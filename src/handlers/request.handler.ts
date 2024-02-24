import { WebhookClient } from 'discord.js';
import { Response } from 'express';
import { Logger } from 'winston';

import { IRequest, IRequestHandler } from './typings/request.handler';

import { ConsoleLogger } from '../loggers/console.logger';

import { GollumEventHandler } from './gollum.event-handler';

export class RequestHandler implements IRequestHandler {
  private static readonly _CONSOLE_LOGGER: Logger = ConsoleLogger.getLogger(
    RequestHandler.name
  );

  public async handleRequest(
    request: IRequest,
    response: Response
  ): Promise<void> {
    let webhookClient: WebhookClient | null = null;

    const githubEvent: string = request.header('X-GitHub-Event') as string;

    RequestHandler._CONSOLE_LOGGER.info(
      `Received ${githubEvent} event from GitHub`
    );

    RequestHandler._CONSOLE_LOGGER.verbose('Retrieving Discord webhook...');

    try {
      webhookClient = new WebhookClient({
        url: request.query.webhookUrl
      });
    } catch (error) {
      RequestHandler._CONSOLE_LOGGER.error(
        `Failed to retrieve Discord webhook: ${(error as Error).message}`
      );

      response.status(500).send('Internal Server Error');

      return;
    }

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
