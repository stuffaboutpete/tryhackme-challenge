import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";
import { highlightResult } from './src/model/wildcard-search/highlight-result';
import { regexPattern as wildcardSearchPattern } from 'src/model/wildcard-search/regex-pattern';

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

app.get('/hotels', async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB...');

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    const db = mongoClient.db()
    const collection = db.collection('hotels');
    res.send(await collection.find().toArray())
  } finally {
    await mongoClient.close();
  }
});

app.get('/search/:query/:numberOfResults?', async (req, res) => {
  const mongoClient = new MongoClient(DATABASE_URL);
  console.log('Connecting to MongoDB...');

  const searchQuery = req.params.query;
  const numberOfResults = parseInt(req.params.numberOfResults || '') || 10;

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    const db = mongoClient.db()
    const hotelsCollection = db.collection('hotels');
    const countriesCollection = db.collection('countries');
    const citiesCollection = db.collection('cities');
    const query = (field: string) => ({ [field]: { $regex: wildcardSearchPattern(searchQuery) } });
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

    res.send({
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
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
