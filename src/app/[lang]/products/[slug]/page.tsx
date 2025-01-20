import { MongoClient } from 'mongodb';
import { Badge, Button, Container, Divider, Group, List, Rating, Space, Text } from '@mantine/core';
import { Image } from '@mantine/core';
import Error404 from '@/src/components/Error/Error404';
import Link from 'next/link';
import { WebsiteData } from '@/src/types/dictionaries';
import { getDictionary } from '../../dictionaries';
import { Locale } from '@/src/types/Header';
import { EditionProductModale } from '@/src/components/EditionProductModale/EditionProductModale';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

async function getProductBySlug(slug: any, lang: any) {
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

        const request = lang ? { [`title.${lang}`]: decodeURIComponent(title) } : { title: decodeURIComponent(title) };

        console.log(request)
        console.log(lang)

        const product = await db.collection('products').findOne(request);

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
    const { slug, lang } = await params;
    const product = await getProductBySlug(slug, lang) as any;
    // @ts-ignore
    const dictionary: WebsiteData = await getDictionary(lang);
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    console.log(product.dimentions.length, product.dimentions.width)

    if (!product) {
        return <Error404 />
    }

    return (
        <Container my="md">
            {token && <EditionProductModale product={product} />}
            <Group justify="space-between">
                <h1>{product.seoTitle || product.title[lang]}</h1>
                <Badge color="grey">{product.category || 'Uncategorized'}</Badge>
                <Text c="dimmed">{dictionary.products.qualityFranckSabet}</Text>
            </Group>
            <Space h="lg" />
            <Divider />

            {product.mainImage && (
                <>
                    <Space h="lg" />
                    <Image
                        radius="md"
                        height={300}
                        style={{ boxShadow: 'black 0 0 0 0' }}
                        src={product.mainImage}
                        alt={product.title[lang]}
                        fit="contain"
                        mb="xl"
                        mt="xl" />
                    <Space h="lg" />
                    <Divider /></>
            )}

            <p>{product.description[lang]}</p>

            <Group gap="xs">
                <Text size="sm">Dimensions:</Text>
                <Badge color="lightgrey" style={{ color: 'black' }}>
                    {product.dimentions.length ?? dictionary.products.custom} x {product.dimentions.width ?? dictionary.products.custom} cm
                </Badge>
            </Group>

            {product.stock !== undefined && (
                <Text size="sm" color={product.stock > 0 ? 'green' : 'red'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Text>
            )}

            {/* <Text size="lg" fw={700} mb="md">
                {product.price}€
            </Text> */}

            {product.rating !== undefined && (
                <Group mt="sm">
                    <Rating value={product.rating} readOnly />
                    <Text size="sm">({product.rating} stars)</Text>
                </Group>
            )}

            {/* TODO USE THE SEO TAGS */}
            {/* TODO ADD PAYMENT HERE */}
            <Space h="lg" />
            <Divider />
            <h3>{dictionary.products.redirectionTitle}</h3>
            <Text size="md" c="dimmed" mb="md">
                {dictionary.products.redirectionSubtitle}
            </Text>
            <Button mt="xl" color="grey" component={Link} href="/products">{dictionary.products.back}</Button>
        </Container>
    );
}
