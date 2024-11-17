import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { searchAllEntities } from 'src/model/database/search-all-entities';

type T = (request: Request, response: Response, database: Db) => Promise<void>;

export const search: T = async (request, response, database) => {
  const searchTerm = request.params.query;
  const numberOfResults = parseInt(request.params.numberOfResults || '') || 10;
  const results = await searchAllEntities(database, searchTerm, numberOfResults);

  response.send(results);
};
