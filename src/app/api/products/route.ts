import { MongoClient, ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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
    const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret';
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    // Validate token
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized: Token not provided' }, { status: 401 });
    }

    try {
        jwt.verify(token, SECRET_KEY); // Verifies the token, throws an error if invalid
    } catch (error) {
        cookieStore.delete('authToken');
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Validate and parse request body
    try {
        const body = await req.json();
        const {
            title,
            price,
            dimentions,
            mainImage,
            description,
            category,
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
        } = body;

        if (!title || !price || !mainImage || !description) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Connect to the database and insert the product
        try {
            const client = await clientPromise;
            const db = client.db('blogDB');
            const collection = db.collection('products');

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

            return NextResponse.json({ message: 'Product added successfully', data: result });
        } catch (dbError) {
            console.error('Error saving product:', dbError);
            return NextResponse.json({ message: 'Database error', error: dbError }, { status: 500 });
        }
    } catch (bodyError) {
        console.error('Error parsing request body:', bodyError);
        return NextResponse.json({ message: 'Invalid request body', error: bodyError }, { status: 400 });
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
                    { category: { $regex: query, $options: "i" } },
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

