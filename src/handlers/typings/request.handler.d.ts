import { Request, Response } from 'express';

export interface IRequest extends Request {
  query: {
    webhookUrl: string;
  };
}

export interface IRequestHandler {
  handleRequest(request: IRequest, response: Response): void;
}
