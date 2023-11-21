import { WebhookClient } from 'discord.js';
import { Request, Response } from 'express';

export interface IEventHandler {
  handleEvent(
    webhookClient: WebhookClient,
    request: Request,
    response: Response
  ): void;
}
