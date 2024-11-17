import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { highlightResult } from '../model/wildcard-search/highlight-result';
import { regexPattern as wildcardSearchPattern } from '../model/wildcard-search/regex-pattern';

type T = (request: Request, response: Response, database: Db) => Promise<void>;

export const search: T = async (request, response, database) => {
  const searchQuery = request.params.query;
  const numberOfResults = parseInt(request.params.numberOfResults || '') || 10;

  const hotelsCollection = database.collection('hotels');
  const countriesCollection = database.collection('countries');
  const citiesCollection = database.collection('cities');
  const query = (field: string) => ({ [field]: { $regex: wildcardSearchPattern(searchQuery), $options: 'i' } });
  const hotelsQueryOptions = { projection: { _id: 1, hotel_name: 1 } };
  const countriesQueryOptions = { projection: { _id: 1, country: 1 } };
  const citiesQueryOptions = { projection: { _id: 1, name: 1 } };
  const hotelsPromise = hotelsCollection.find(query('hotel_name'), hotelsQueryOptions).toArray();
  const countriesPromise = countriesCollection.find(query('country'), countriesQueryOptions).toArray();
  const citiesPromise = citiesCollection.find(query('name'), citiesQueryOptions).toArray();

  const [hotels, countries, cities] = await Promise.all([hotelsPromise, countriesPromise, citiesPromise]);

  const evaluatedHotels = hotels.map(hotel => ({
    hotel,
    searchTermGroups: highlightResult(hotel.hotel_name, searchQuery)
  }));

  evaluatedHotels.sort((a, b) => a.searchTermGroups.length - b.searchTermGroups.length);

  const evaluatedCountries = countries.map(country => ({
    country,
    searchTermGroups: highlightResult(country.country, searchQuery)
  }));

  evaluatedCountries.sort((a, b) => a.searchTermGroups.length - b.searchTermGroups.length);

  const evaluatedCities = cities.map(city => ({
    city,
    searchTermGroups: highlightResult(city.name, searchQuery)
  }));

  evaluatedCities.sort((a, b) => a.searchTermGroups.length - b.searchTermGroups.length);

  response.send({
    hotels: {
      count: Math.min(evaluatedHotels.length, numberOfResults),
      results: evaluatedHotels.slice(0, numberOfResults)
    },
    countries: {
      count: Math.min(evaluatedCountries.length, numberOfResults),
      results: evaluatedCountries.slice(0, numberOfResults)
    },
    cities: {
      count: Math.min(evaluatedCities.length, numberOfResults),
      results: evaluatedCities.slice(0, numberOfResults)
    }
  });
};
