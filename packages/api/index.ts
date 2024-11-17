import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";
import { hotels } from './src/route/hotels';
import { routeWrapper as createRouteWrapper } from './src/route/route-wrapper';
import { search } from './src/route/search';

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

// I'm going to keep this one instance
// of the database open. A non-naive
// solution would use pooling, automatically
// re-open the connection when it is lost
// and probably pass the connection
// around using middleware. (TODO)
console.log('Connecting to MongoDB...');
const mongoClient = new MongoClient(DATABASE_URL);
await mongoClient.connect();
console.log('Successfully connected to MongoDB!');

const routeWrapper = createRouteWrapper(mongoClient.db());

app.get('/hotels', routeWrapper(hotels));
app.get('/search/:query/:numberOfResults?', routeWrapper(search));

app.listen(PORT, () => console.log(`API Server Started at ${PORT}`));
