import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || '';

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// @ts-ignore
if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    // @ts-ignore
    global._mongoClientPromise = client.connect();
}

// @ts-ignore
clientPromise = global._mongoClientPromise;

export async function POST(req: Request) {
    const body = await req.json();
    const { title, date, content, mainImage } = body;

    try {
        const client = await clientPromise;
        const db = client.db('blogDB'); // Remplacez `blogDB` par le nom de votre base
        const collection = db.collection('articles'); // Remplacez `articles` par le nom de votre collection

        const result = await collection.insertOne({
            title,
            date,
            content,
            mainImage,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: 'Article added successfully', data: result });
    } catch (error) {
        console.error('Error saving article:', error);
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
