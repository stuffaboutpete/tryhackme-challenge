import { Request, Response } from 'express'

type T = (request: Request, response: Response) => void;

export const notImplemented: T = (_, response) => {
  response.sendStatus(501);
};
