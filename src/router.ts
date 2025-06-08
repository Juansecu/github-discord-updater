import { Response, Router } from 'express';

import { IRequest } from './handlers/typings/request.handler';

import { validateDiscordWebhookUrl } from './middlewares/validate-discord-webhook-url.middleware';
import { validateRequestBody } from './middlewares/validate-request-body.middleware';

import { RequestHandler } from './handlers/request.handler';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: Webhook operations
 * /?webhookUrl={webhookUrl}:
 *   post:
 *     description: Handles a webhook request.
 *     summary: Handles a webhook request
 *     tags: [Webhooks]
 *     parameters:
 *       - in: header
 *         name: X-GitHub-Event
 *         description: |
 *           The event type, which is used to determine the action to be taken.
 *
 *           Supported event types can be found [here](https://github.com/Juansecu/github-discord-updater/blob/main/README.md#supported-github-events).
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: webhookUrl
 *         description: The URL of the Discord webhook to which the request will be forwarded.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The request body must be a JSON object.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The request was processed successfully.
 *       204:
 *         description: The request was processed, but no action was taken.
 *       400:
 *         description: The request body is invalid.
 *       403:
 *         description: The client is not GitHub.
 *       500:
 *         description: An error occurred while processing the request.
 */
router.post(
  '/',
  validateRequestBody,
  validateDiscordWebhookUrl,
  async (request: IRequest, response: Response): Promise<void> => {
    await new RequestHandler().handleRequest(request, response);
  }
);

export default router;
