import { Hotel } from './type/hotel';

type T = (searchTerm: string, apiUrl: string) => Promise<Hotel[]>;

export const fetchAndFilterHotels: T = async (value, apiUrl) => {
  const hotelsData = await fetch(`${apiUrl}/hotels`);
  const hotels = (await hotelsData.json()) as Hotel[];
  return hotels.filter(
    ({ chain_name, hotel_name, city, country }) =>
      chain_name.toLowerCase().includes(value.toLowerCase()) ||
      hotel_name.toLowerCase().includes(value.toLowerCase()) ||
      city.toLowerCase().includes(value.toLowerCase()) ||
      country.toLowerCase().includes(value.toLowerCase())
  );
};
