import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret';
const USERNAME = process.env.BASIC_AUTH_USERNAME || 'admin';
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'password123';

export async function POST(req: Request) {
    console.log('Request received:', req.method, req.url);
    const body = await req.json(); // Parse the JSON body
    const { username, password } = body;

    if (!username || !password) {
        return NextResponse.json({ error: "An error occurred" }, { status: 400 });
    }

    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return NextResponse.json(token, { status: 200 });
    } else {
        return NextResponse.json({ error: "An error occurred" }, { status: 401 });
    }
}
