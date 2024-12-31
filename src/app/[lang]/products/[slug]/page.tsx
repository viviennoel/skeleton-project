import { notFound } from 'next/navigation';
import { MongoClient } from 'mongodb';
import { Container } from '@mantine/core';
import { Image } from '@mantine/core';
import { EditionModale } from '@/src/components/EditionModale/EditionModale';
import useRouter from 'next/navigation';

async function getProductBySlug(slug: any) {
    const uri = process.env.MONGODB_URI ?? "";
    if (!uri) {
        console.error("MongoDB URI is not defined in environment variables.");
        return null;
    }

    let client: MongoClient | null = null;
    try {
        client = await MongoClient.connect(uri);

        const db = client.db('blogDB');
        const title = slug.replace(/-/g, ' ');

        const product = await db.collection('products').findOne({ title: title });

        if (!product) {
            console.warn("No product found with the title:", title);
            return null;
        }

        return {
            ...product,
            _id: product._id.toString(),
            createdAt: product.createdAt.toString(),
        };
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching product:", error);
        return null;
    } finally {
        if (client) {
            await client.close();
            console.log("MongoDB connection closed.");
        }
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const router = useRouter;
    const product = await getProductBySlug(slug) as any;

    if (!product) {
        router.redirect('/products')
    }

    return (
        <Container my='md'>
            <EditionModale content={product.content} id={product._id} />
            <h1>{product.title}</h1>
            <p>{new Date(product.date).toLocaleDateString()}</p>
            {product.mainImage && (
                <Image
                    radius="md"
                    h={300}
                    src={product.mainImage}
                    alt={product.title}
                    fit='cover'
                />
            )}


            <div dangerouslySetInnerHTML={{ __html: product.content }} />
        </Container>
    );
}

// export async function generateStaticParams() {
//     const client = await MongoClient.connect(process.env.MONGODB_URI ?? '');
//     const db = client.db();

//     const products = await db.collection('products').find({}, { projection: { title: 1 } }).toArray();

//     client.close();

//     return products.map((product) => ({
//         slug: product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
//     }));
// }
