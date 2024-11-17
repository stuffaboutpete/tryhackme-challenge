import { Db } from 'mongodb';
import { searchSingleEntity } from './search-single-entity';
import { selectResults } from '../wildcard-search/select-results';
import { Results } from '../wildcard-search/type/results';

interface Response {
  hotels: {
    count: number;
    results: Results;
  };
  countries: {
    count: number;
    results: Results;
  };
  cities: {
    count: number;
    results: Results;
  };
};

type T = (database: Db, searchTerm: string, numberOfResults: number) => Promise<Response>;

export const searchAllEntities: T = async (database, searchTerm, numberOfResults) => {
  const entities = [
    { type: 'hotel', collection: 'hotels', field: 'hotel_name' },
    { type: 'country', collection: 'countries', field: 'country' },
    { type: 'city', collection: 'cities', field: 'name' }
  ];

  const promises = entities.map(entity => {
    return searchSingleEntity(
      database,
      entity.collection,
      entity.field,
      searchTerm
    );
  });

  const data = await Promise.all(promises);

  const [hotels, countries, cities] = data.map((next, index) => {
    const entity = entities[index];
    return selectResults(next, entity.type, entity.field, searchTerm, numberOfResults);
  });

  return {
    hotels: {
      count: hotels.length,
      results: hotels
    },
    countries: {
      count: countries.length,
      results: countries
    },
    cities: {
      count: cities.length,
      results: cities
    }
  };
};

