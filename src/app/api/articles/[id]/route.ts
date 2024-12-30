import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// @ts-ignore
export async function PUT(req, { params }) {
    const uri = process.env.MONGODB_URI || '';
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
    const { id } = await params;
    const { content } = await req.json();

    try {
        const client = await clientPromise;
        const db = client.db('blogDB'); // Remplacez `blogDB` par le nom de votre base
        const collection = db.collection('articles'); // Remplacez `articles` par le nom de votre collection

        const result = await collection.updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: { content } }
        );

        if (result.modifiedCount === 0) {
            NextResponse.json("Failed to update article, no result", { status: 500 });
        }

        return NextResponse.json({ message: 'Article added successfully', data: result });
    } catch (error) {
        console.error('Error saving article:', error);
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
