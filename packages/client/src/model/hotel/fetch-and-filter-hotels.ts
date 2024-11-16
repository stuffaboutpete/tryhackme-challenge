import { HotelWithSearchTermGroups } from './type/hotel-with-search-term-groups';

type T = (searchTerm: string, apiUrl: string) => { abort: (reason: string) => void, hotels: Promise<HotelWithSearchTermGroups[]> };

export const fetchAndFilterHotels: T = (value, apiUrl) => {
  const abortController = new AbortController();

  const makeRequest = async () => {
    const hotelsData = await fetch(`${apiUrl}/search/${value}`, { signal: abortController.signal });
    const payload = await hotelsData.json();
    return payload.results;
  };

  return {
    abort: (reason: string) => abortController.abort(reason),
    hotels: new Promise(resolve => makeRequest().then(resolve))
  };
};
