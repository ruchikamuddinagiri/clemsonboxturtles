// pages/api/submitData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import clientPromise from '../mongodb';
import multer from 'multer';
import { IncomingForm } from 'formidable';

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Disable Next.js's built-in body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req)
//   if (req.method === 'POST') {
//     // Handle multipart form data
//     const form = new IncomingForm({ keepExtensions: true });
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }

//       try {
//         const client: MongoClient = await clientPromise;
//         const db = client.db("turtle-name");

//         // Example data insertion using the fields and files from the form
//         const userData = {
//           ...fields,
//           picturePath: files.picture ? files.picture.filepath : '',
//         };

//         const result = await db.collection('users').insertOne(userData);

//         return new Response(JSON.stringify(result), {
//           headers: {
//             "Content-Type": "application/json"
//           },
//           status: 201,
//         })


//         // res.status(201).json({ message: 'Data submitted successfully', result });
//       } catch (error) {
//         console.error('MongoDB Insert Error:', error);

//         return new Response(JSON.stringify({ error: 'Failed to submit data', details: error }), {
//           headers: {
//             "Content-Type": "application/json"
//           },
//           status: 500,
//         })

//         // res.status(500).json({ error: 'Failed to submit data', details: error });
//       }
//     });
//   } else {
//     return new Response(JSON.stringify({ error: 'Failed to submit data'}), {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       status: 405,
//     })
//     // res.setHeader('Allow', ['POST']);
//     // res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   console.log("request body", req.body)

//     if (req.method === 'POST') {
//         const form = new IncomingForm({ keepExtensions: true });
//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
            

//             try {
//                 const client: MongoClient = await clientPromise;
//                 const db = client.db("turtle-name");

//                 const userData = {
//                     ...fields,
//                     picturePath: files.picture ? files.picture.filepath : '',
//                 };

//                 const result = await db.collection('users').insertOne(userData);
//                 res.status(201).json({ message: 'Data submitted successfully', result });
//             } catch (error) {
//                 console.error('MongoDB Insert Error:', error);
//                 res.status(500).json({ error: 'Failed to submit data', details: error });
//             }
//         });
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// }

export async function POST(req: Request) {
 
  const formData = await req.json()
  try{
    const client: MongoClient = await clientPromise;
    const db = client.db("box-turtle");
    const result = await db.collection('turtle').insertOne(formData);
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