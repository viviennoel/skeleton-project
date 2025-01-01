import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
const PAGE_SIZE = 9;

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
    const { title,
        price,
        dimentions,
        mainImage,
        description,
        category,
        tags,
        seoTitle,
        seoDescription,
        seoKeywords
    } = body;

    try {
        const client = await clientPromise;
        const db = client.db('blogDB'); // Remplacez `blogDB` par le nom de votre base
        const collection = db.collection('products'); // Remplacez `products` par le nom de votre collection

        const result = await collection.insertOne({
            title,
            mainImage,
            price: Number(price),
            dimentions,
            createdAt: new Date(),
            description,
            category,
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
        });

        return NextResponse.json({ message: 'product added successfully', data: result });
    } catch (error) {
        console.error('Error saving product:', error);
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") || "";

    try {
        const client = await clientPromise;
        const db = client.db('blogDB'); // Remplacez `blogDB` par le nom de votre base
        const collection = db.collection('products'); // Remplacez `products` par le nom de votre collection


        // Build the search query
        const searchQuery = query
            ? {
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { tags: { $regex: query, $options: "i" } },
                ],
            }
            : {};

        // Count total documents matching the query
        const totalDocuments = await collection.countDocuments(searchQuery);

        // Fetch paginated products
        const products = await collection
            .find(searchQuery)
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();

        return NextResponse.json({
            products: products.map((product) => ({
                ...product,
                _id: product._id.toString(), // Convert ObjectId to string
            })),
            totalPages: Math.ceil(totalDocuments / PAGE_SIZE),
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

