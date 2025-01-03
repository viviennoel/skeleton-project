import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const POST = async (req: Request) => {
    // TODO - REMOVE DUPLICATION
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
    // UNITL HERE SEVERAL FILES

    try {
        const form = await req.formData();
        const image = form.get("file") as File;

        if (!image) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const fileBuffer = await image.arrayBuffer();

        const mime = image.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = `data:${mime};${encoding},${base64Data}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: "blog-media",
            invalidate: true,
            resource_type: mime.startsWith("video/") ? "video" : "image",
        });

        return NextResponse.json(
            { success: true, url: result.secure_url },
            { status: 200 }
        );
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: (error as any).message },
            { status: 500 }
        );
    }
};
