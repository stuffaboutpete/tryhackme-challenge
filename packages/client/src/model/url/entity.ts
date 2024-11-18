import { EntityType } from '../entities/type/entity-type';

type T = (path: string) => undefined | EntityType;

export const entity: T = path => {
  const match = path.match(/^\/(hotels|countries|cities)\/[a-z0-9]+\/?$/);

  if (match === null) return undefined;
  if (match[1] === 'hotels') return 'hotel';
  if (match[1] === 'countries') return 'country';
  if (match[1] === 'cities') return 'city';
};
