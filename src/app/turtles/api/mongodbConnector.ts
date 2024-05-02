// lib/mongodb.ts
import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI; // MongoDB connection string
const uri = "mongodb+srv://rmuddin:m%40unna123@cluster0.yhha5m5.mongodb.net/box-turtle?retryWrites=true&w=majority"
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri, options);
clientPromise = client.connect();

// if (!process.env.MONGODB_URI) {
//     throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable so the database connection
//     // is preserved between hot reloads in Next.js.
//     if (!(global as any)._mongoClientPromise) {
//         client = new MongoClient(uri, options);
//         (global as any)._mongoClientPromise = client.connect();
//     }
//     clientPromise = (global as any)._mongoClientPromise;
// } else {
//     // In production mode, it's best to not use a global variable.
//     client = new MongoClient(uri, options);
//     clientPromise = client.connect();
// }

export default clientPromise;
