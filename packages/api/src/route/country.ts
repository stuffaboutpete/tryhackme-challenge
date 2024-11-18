import { Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';

type T = (request: Request, response: Response, database: Db) => Promise<void>;

export const country: T = async (request, response, database) => {
  let id: string | ObjectId = request.params.id;
  const collection = database.collection('countries');

  try {
    id = new ObjectId(id);
  } catch (error) {
    response.status(400).send('Invalid ID format');
    return;
  }

  const data = await collection.findOne({ _id: new ObjectId(id) });

  if (data === null) {
    response.sendStatus(404);
  } else {
    response.send(data);
  }
};
