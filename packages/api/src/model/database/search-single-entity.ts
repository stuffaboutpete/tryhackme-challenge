import { Db, Document } from 'mongodb';
import { mongoSearchQuery } from './mongo-search-query';

type T = (database: Db, collectionName: string, field: string, searchTerm: string) => Promise<Document[]>;

export const searchSingleEntity: T = async (database, collectionName, field, searchTerm) => {
  const collection = database.collection(collectionName);
  const query = mongoSearchQuery(searchTerm, field);
  const config = { projection: { _id: 1, [field]: 1 }};

  return collection.find(query, config).toArray();
};
