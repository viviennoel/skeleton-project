import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to convert a ReadableStream to Node.js Readable
function readableStreamToNodeStream(stream: ReadableStream<Uint8Array>): Readable {
    const reader = stream.getReader();
    return new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) {
                this.push(null); // Signal EOF
            } else {
                this.push(value);
            }
        },
    });
}

// API Route to handle upload
export const POST = async (req: Request) => {
    try {
        const form = await req.formData();
        const file = form.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Check file type (image or video)
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if (!isImage && !isVideo) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Convert ReadableStream to Node.js Readable
        const nodeStream = readableStreamToNodeStream(file.stream());

        // Cloudinary transformation options
        const transformationOptions = isImage
            ? {
                folder: 'blog-media',
                resource_type: 'image' as 'image',
                format: 'webp', // Convert to webp
                quality: 'auto',
                fetch_format: 'auto',
                width: 900, // Resize to max 1400px width
                crop: 'limit',
                transformation: [{ quality: "auto:eco" }],
            }
            : {
                folder: 'blog-media',
                resource_type: 'video' as 'video',
                format: 'mp4', // Use mp4 for videos
                quality: 'auto',
                fetch_format: 'auto',
            };

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                transformationOptions,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );

            // Pipe the Node.js stream to Cloudinary
            nodeStream.pipe(uploadStream);
        });

        // @ts-ignore
        return NextResponse.json({ url: result.secure_url });
    } catch (error) {
        console.error('Error uploading file:', error);

        // @ts-ignore
        return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
    }
};
