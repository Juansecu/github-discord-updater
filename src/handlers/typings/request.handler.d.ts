import { Request, Response } from 'express';

export interface IRequestHandler {
  handleRequest(request: Request, response: Response): void;
}
