import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        return NextResponse.json({ message: "MongoDB URI is not defined" }, { status: 500 });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("blogDB");

        // Fetch data based on query type
        const articles = await db.collection("articles").find({}).limit(10).toArray();
        const products = await db.collection("products").find({}).limit(10).toArray();

        return NextResponse.json({ articles, products }, { status: 200 });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ message: "Error connecting to MongoDB" }, { status: 500 });
    } finally {
        await client.close();
    }
}

