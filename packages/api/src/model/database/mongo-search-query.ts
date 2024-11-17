import { MongoSearchQuery } from './type/mongo-search-query';
import { regexPattern as wildcardSearchPattern } from '../wildcard-search/regex-pattern';

type T = (searchTerm: string, field: string) => MongoSearchQuery;

export const mongoSearchQuery: T = (searchTerm, field) => {
  return {
    [field]: {
      $regex: wildcardSearchPattern(searchTerm),
      $options: 'i'
    }
  }
};
