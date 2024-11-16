import { Hotel } from './type/hotel';

type T = (searchTerm: string, apiUrl: string) => { abort: (reason: string) => void, hotels: Promise<Hotel[]> };

export const fetchAndFilterHotels: T = (value, apiUrl) => {
  const abortController = new AbortController();

  const makeRequest = async () => {
    const hotelsData = await fetch(`${apiUrl}/hotels`, { signal: abortController.signal });
    const hotels = (await hotelsData.json()) as Hotel[];
    return hotels.filter(
      ({ chain_name, hotel_name, city, country }) =>
        chain_name.toLowerCase().includes(value.toLowerCase()) ||
        hotel_name.toLowerCase().includes(value.toLowerCase()) ||
        city.toLowerCase().includes(value.toLowerCase()) ||
        country.toLowerCase().includes(value.toLowerCase())
    );
  };

  return {
    abort: (reason: string) => abortController.abort(reason),
    hotels: new Promise(resolve => makeRequest().then(resolve))
  };
};
