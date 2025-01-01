import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const POST = async (req: Request) => {
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
