import { EmbedBuilder, WebhookClient } from 'discord.js';
import { Response } from 'express';
import { Logger } from 'winston';

import { IEventHandler } from './typings/event.handler';
import { IPage } from '../github/typings/page';
import { IGollumRequest } from '../github/typings/requests/gollum.request';

import { EGollumAction } from '../github/enums/gollum-action.enum';

import { ConsoleLogger } from '../loggers/console.logger';

export class GollumEventHandler implements IEventHandler {
  public static readonly GITHUB_EVENT: string = 'gollum';

  private static readonly _CONSOLE_LOGGER: Logger = ConsoleLogger.getLogger(
    GollumEventHandler.name
  );

  public async handleEvent(
    webhookClient: WebhookClient,
    request: IGollumRequest,
    response: Response
  ): Promise<void> {
    const embedLimit = 10;
    const embedMessages: EmbedBuilder[] = [];

    GollumEventHandler._CONSOLE_LOGGER.verbose(
      `Handling ${GollumEventHandler.GITHUB_EVENT} event...`
    );

    for (let i = 0; i < embedLimit && i < request.body.pages.length; i++) {
      let embedTitle = '';

      const embedBuilder: EmbedBuilder = new EmbedBuilder();
      const page: IPage = request.body.pages[i];

      embedTitle = `[${request.body.repository.name}]`;

      if (page.action === EGollumAction.EDITED) {
        embedTitle += ` Page edited: ${page.title}`;
        embedBuilder.setColor('Orange');
      } else if (page.action === EGollumAction.CREATED) {
        embedTitle += ` New page created: ${page.title}`;
        embedBuilder.setColor('Green');
      }

      embedBuilder.setAuthor({
        iconURL: request.body.sender.avatar_url,
        name: request.body.sender.login,
        url: request.body.sender.html_url
      });
      embedBuilder.setTitle(embedTitle);
      embedBuilder.setURL(page.html_url);
      embedBuilder.setDescription(
        page.summary ??
          `Check out the changes [here](${page.html_url}/_history)!`
      );

      embedMessages.push(embedBuilder);
    }

    try {
      await webhookClient.send({
        embeds: embedMessages
      });
    } catch (error) {
      GollumEventHandler._CONSOLE_LOGGER.error(error);
      response.status(500).send();
      return;
    }

    response.status(202).send();

    GollumEventHandler._CONSOLE_LOGGER.info(
      `Handled ${GollumEventHandler.GITHUB_EVENT} event successfully`
    );
  }
}
