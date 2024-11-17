import { Request, RequestHandler, Response } from 'express';
import { Db } from 'mongodb';

type T = (database: Db) => (callback: (request: Request, response: Response, database: Db) => Promise<void>) => RequestHandler;

export const routeWrapper: T = database => callback => {
  return (request, response, next) => callback(request, response, database).catch(next);
};