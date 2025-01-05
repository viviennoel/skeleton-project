import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { ResolveLocale } from '@formatjs/intl-localematcher';
import { useParams } from 'next/navigation';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret';
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

    const body = await req.json();
    const { title,
        date,
        mainImage,
        description,
        content,
        author,
        category,
        tags,
        seoTitle,
        seoDescription,
        seoKeywords,
        lang
    } = body;

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
            description,
            author,
            category,
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
            lang,
        });

        return NextResponse.json({ message: 'Article added successfully', data: result });
    } catch (error) {
        console.error('Error saving article:', error);
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") || "";
    const lang = searchParams.get("lang") || "";

    try {
        const client = await clientPromise;
        const db = client.db('blogDB'); // Remplacez `blogDB` par le nom de votre base
        const collection = db.collection('articles'); // Remplacez `articles` par le nom de votre collection

        const searchQuery: any = {};
        const effectiveLang = lang || 'fr';

        if (query) {
            searchQuery.$or = [
                { title: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } },
            ];
        }

        searchQuery.lang = { $regex: effectiveLang, $options: "i" };

        // Count total documents matching the query
        const totalDocuments = await collection.countDocuments(searchQuery);

        // Fetch paginated articles
        const articles = await collection
            .find(searchQuery)
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray();

        return NextResponse.json({
            articles: articles.map((article) => ({
                ...article,
                _id: article._id.toString(), // Convert ObjectId to string
            })),
            totalPages: Math.ceil(totalDocuments / PAGE_SIZE),
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

