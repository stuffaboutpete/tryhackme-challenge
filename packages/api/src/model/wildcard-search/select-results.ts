import { Document } from 'mongodb';
import { Results } from './type/results';
import { highlightResult } from './highlight-result';

type T = (results: Document[], entityType: string, field: string, searchTerm: string, numberOfResults: number) => Results;

export const selectResults: T = (results, entityType, field, searchTerm, numberOfResults) => {
  const evaluatedResults = results.map(result => ({
    [entityType]: result,
    searchTermGroups: highlightResult(result[field], searchTerm)
  }));

  evaluatedResults.sort((a, b) => a.searchTermGroups.length - b.searchTermGroups.length);

  return evaluatedResults.slice(0, numberOfResults);
};
