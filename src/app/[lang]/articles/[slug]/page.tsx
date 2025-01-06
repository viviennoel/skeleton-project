import { MongoClient } from 'mongodb';
import { Container } from '@mantine/core';
import { Image } from '@mantine/core';
import { EditionModale } from '@/src/components/EditionModale/EditionModale';
import Error404 from '@/src/components/Error/Error404';
import DOMPurify from 'dompurify';
import { cookies } from 'next/headers';
import { JSDOM } from "jsdom";



async function getArticleBySlug(slug: any) {
    const uri = process.env.MONGODB_URI ?? "";
    if (!uri) {
        console.error("MongoDB URI is not defined in environment variables.");
        return null;
    }

    let client: MongoClient | null = null;
    try {
        client = await MongoClient.connect(uri);

        const db = client.db('blogDB');
        const title = decodeURIComponent(slug.replace(/-/g, ' '));

        const article = await db.collection('articles').findOne({ title: title });

        if (!article) {
            console.warn("No article found with the title:", title);
            return null;
        }

        return {
            ...article,
            _id: article._id.toString(),
            createdAt: article.createdAt.toString(),
        };
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching article:", error);
        return null;
    } finally {
        if (client) {
            await client.close();
            console.log("MongoDB connection closed.");
        }
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug) as any;
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    const window = new JSDOM("").window;
    const DOMPurifyServer = DOMPurify(window);


    if (!article) {
        return <Error404 />
    }

    return (
        <Container my='md'>
            {token && <EditionModale content={article.content} id={article._id} />}
            <h1>{article.title}</h1>
            {/* To do - check date */}
            {/* <p>{new Date(article.date).toLocaleDateString()}</p> */}
            {article.mainImage && (
                <Image
                    radius="md"
                    h={300}
                    src={article.mainImage || '/fallback-image.jpg'}
                    alt={article.title || 'image'}
                    fit='cover'
                />
            )}


            <div dangerouslySetInnerHTML={{ __html: DOMPurifyServer.sanitize(article.content) }} />
        </Container>
    );
}

// export async function generateStaticParams() {
//     const client = await MongoClient.connect(process.env.MONGODB_URI ?? '');
//     const db = client.db();

//     const articles = await db.collection('articles').find({}, { projection: { title: 1 } }).toArray();

//     client.close();

//     return articles.map((article) => ({
//         slug: article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
//     }));
// }
