import { AbortCallback } from './type/abort-callback';
import { AllSearchResults } from './type/all-search-results';
import { Response } from './type/response';

type T = (searchTerm: string, apiUrl: string) => { abort: AbortCallback, response: Promise<AllSearchResults> };

export const search: T = (searchTerm, apiUrl) => {
  const abortController = new AbortController();

  const makeRequest = async () => {
    const response = await fetch(`${apiUrl}/search/${value}`, { signal: abortController.signal });
    return response.json();
  };

  const processResults = (data: Response): AllSearchResults => {
    return {
      hotels: data.hotels.results.map(({ hotel, searchTermGroups }) => ({ entity: hotel, searchTermGroups })),
      countries: data.countries.results.map(({ country, searchTermGroups }) => ({ entity: country, searchTermGroups })),
      cities: data.cities.results.map(({ city, searchTermGroups }) => ({ entity: city, searchTermGroups }))
    };
  };

  return {
    abort: (reason: string) => abortController.abort(reason),
    response: new Promise(resolve => makeRequest().then(data => resolve(processResults(data))))
  };
};
