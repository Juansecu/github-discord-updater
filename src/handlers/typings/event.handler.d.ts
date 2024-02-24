import { WebhookClient } from 'discord.js';
import { Response } from 'express';

import { IRequest } from './request.handler';

export interface IEventHandler {
  handleEvent(
    webhookClient: WebhookClient,
    request: IRequest,
    response: Response
  ): void;
}
