import { EmbedBuilder, WebhookClient } from 'discord.js';
import { Response } from 'express';
import { Logger } from 'winston';

import { IEventHandler } from './typings/event.handler';
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

    if (!request.body.pages) {
      GollumEventHandler._CONSOLE_LOGGER.error(
        'Request body is missing the "pages" property'
      );

      response.status(400).send('Bad Request');

      return;
    }

    if (!Array.isArray(request.body.pages)) {
      GollumEventHandler._CONSOLE_LOGGER.error(
        'Request body property "pages" is not an array'
      );

      response.status(400).send('Bad Request');

      return;
    }

    if (request.body.pages.length === 0) {
      GollumEventHandler._CONSOLE_LOGGER.error(
        'Request body property "pages" is an empty array'
      );

      response.status(400).send('Bad Request');

      return;
    }

    if (request.body.pages.length > embedLimit) {
      GollumEventHandler._CONSOLE_LOGGER.error(
        `Request body property "pages" has more than ${embedLimit} items`
      );

      response.status(400).send('Bad Request');

      return;
    }

    for (const page of request.body.pages) {
      let embedTitle = '';

      const embedBuilder: EmbedBuilder = new EmbedBuilder();

      embedTitle = `[${request.body.repository.name}]`;

      if (page.action === EGollumAction.CREATED) {
        embedTitle += ` New page created: ${page.title}`;

        embedBuilder.setColor('Green');
        embedBuilder.setDescription(
          page.summary ?? `Check out the new page [here](${page.html_url})!`
        );
      } else if (page.action === EGollumAction.EDITED) {
        embedTitle += ` Page edited: ${page.title}`;

        embedBuilder.setColor('Orange');
        embedBuilder.setDescription(
          page.summary ??
            `Check out the changes [here](${page.html_url}/_history)!`
        );
      }

      embedBuilder.setAuthor({
        iconURL: request.body.sender.avatar_url,
        name: request.body.sender.login,
        url: request.body.sender.html_url
      });
      embedBuilder.setTitle(embedTitle);
      embedBuilder.setURL(page.html_url);

      embedMessages.push(embedBuilder);
    }

    try {
      await webhookClient.send({
        embeds: embedMessages
      });
    } catch (error) {
      GollumEventHandler._CONSOLE_LOGGER.error(error);
      response.status(500).send('Internal Server Error');
      return;
    }

    response.status(200).send('OK');

    GollumEventHandler._CONSOLE_LOGGER.info(
      `Handled ${GollumEventHandler.GITHUB_EVENT} event successfully`
    );
  }
}
