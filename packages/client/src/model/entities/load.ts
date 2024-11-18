import { AbortCallback } from '../fetch/type/abort-callback';
import { Entity } from './type/entity';
import { EntityType } from './type/entity-type';

type T = (entityType: EntityType, id: string, apiUrl: string) => { abort: AbortCallback, response: Promise<Entity> };

export const load: T = (entityType, id, apiUrl) => {
  const abortController = new AbortController();

  const makeRequest = async () => {
    const response = await fetch(`${apiUrl}/${entityType}/${id}`, { signal: abortController.signal });
    return response.json();
  };

  return {
    abort: (reason: string) => abortController.abort(reason),
    response: new Promise(resolve => makeRequest().then(data => resolve(data)))
  };
};
