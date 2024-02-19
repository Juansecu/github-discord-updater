import express, { Request, Response, Router } from 'express';

import { checkIfClientIsGitHub } from './middlewares/check-whether-client-is-github.middleware';
import { validateRequestBody } from './middlewares/validate-request-body.middleware';

import { RequestHandler } from './handlers/request.handler';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: Webhook operations
 * /{webhookId}/{webhookToken}:
 *   post:
 *     description: Handles a webhook request.
 *     summary: Handles a webhook request
 *     tags: [Webhooks]
 *     parameters:
 *       - in: header
 *         name: X-GitHub-Event
 *         description: The event type.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: webhookId
 *         description: The ID of the webhook.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: webhookToken
 *         description: The token of the webhook.
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
  '/:webhookId/:webhookToken',
  express.json({ type: 'application/json' }),
  checkIfClientIsGitHub,
  validateRequestBody,
  (request: Request, response: Response): void => {
    new RequestHandler().handleRequest(request, response);
  }
);

export default router;
