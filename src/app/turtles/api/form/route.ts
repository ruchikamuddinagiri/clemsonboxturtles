// pages/api/submitData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import clientPromise from '../mongodbConnector';

// Disable Next.js's built-in body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


export async function POST(req: Request) {
 
  const formData = await req.json()
  try{
    const client: MongoClient = await clientPromise;
    const db = client.db("box-turtle");
    console.log(formData.formData.name)
    const existingCollections = await db.listCollections({ name: formData.formData.name }).toArray();
    if (existingCollections.length === 0) {
      // Create the collection with any options if needed (e.g., capped: true, size: 10000)
      await db.createCollection(formData.formData.name);
      console.log(`Collection '${formData.formData.name}' created.`);
    }
    const result = await db.collection(formData.formData.name).insertOne(formData);
    // const result = await db.collection('turtle').insertOne(formData);
    return new Response(JSON.stringify(result), {
                headers: {
                  "Content-Type": "application/json"
                },
                status: 201,
              })

  }
  catch(error){
    console.log(error)
    return new Response(JSON.stringify({ error: error}), {
            headers: {
              "Content-Type": "application/json"
            },
            status: 500,
          })
  }
}