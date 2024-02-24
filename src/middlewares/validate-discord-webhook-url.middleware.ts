import { NextFunction, Response } from 'express';

import { IRequest } from '../handlers/typings/request.handler';

export function validateDiscordWebhookUrl(
  request: IRequest,
  response: Response,
  next: NextFunction
): void {
  if (!request.query.webhookUrl) {
    response.status(400).send('Discord webhook URL is required');
    return;
  }

  next();
}
