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

export async function DELETE(req: any, { params }: any) {
    const uri = process.env.MONGODB_URI || '';
    let client;

    try {
        // Initialize MongoDB client
        client = new MongoClient(uri);
        await client.connect();

        const { id } = params; // Extract the ID from the route parameters
        const db = client.db('blogDB'); // Replace with your database name
        const collection = db.collection('articles'); // Replace with your collection name

        // Perform the deletion
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Failed to delete article, no match found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ message: "An error occurred", error }, { status: 500 });
    } finally {
        // Ensure the client is closed
        if (client) {
            await client.close();
        }
    }
}