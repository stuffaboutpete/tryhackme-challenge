import { Request, Response } from 'express';
import { Db } from 'mongodb';

type T = (request: Request, response: Response, database: Db) => Promise<void>;

export const hotels: T = async (request, response, database) => {
  const collection = database.collection('hotels');
  const data = await collection.find().toArray();
  response.send(data);
};
