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
    const collection = db.collection('hotels');
    const query = { hotel_name: { $regex: wildcardSearchPattern(searchQuery) } };
    const queryOptions = { projection: { _id: 1, hotel_name: 1 } };
    const hotels = await collection.find(query, queryOptions).toArray();

    const evaluatedHotels = hotels.map(hotel => ({
      hotel,
      searchTermGroups: highlightResult(hotel.hotel_name, searchQuery)
    }));

    evaluatedHotels.sort((a, b) => a.searchTermGroups.length - b.searchTermGroups.length);

    res.send({
      count: Math.min(evaluatedHotels.length, numberOfResults),
      results: evaluatedHotels.slice(0, numberOfResults)
    });
  } finally {
    await mongoClient.close();
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
