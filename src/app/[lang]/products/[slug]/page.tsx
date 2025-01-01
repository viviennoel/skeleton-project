import { MongoClient } from 'mongodb';
import { Badge, Button, Container, Divider, Group, List, Rating, Space, Text } from '@mantine/core';
import { Image } from '@mantine/core';
import Error404 from '@/src/components/Error/Error404';
import Link from 'next/link';
import { WebsiteData } from '@/src/types/dictionaries';
import { getDictionary } from '../../dictionaries';
import { Locale } from '@/src/types/Header';
import { EditionProductModale } from '@/src/components/EditionProductModale/EditionProductModale';

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

export default async function ProductPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
    const { slug, lang } = await params;
    const product = await getProductBySlug(slug) as any;
    const dictionary: WebsiteData = await getDictionary(lang);


    if (!product) {
        return <Error404 />
    }

    return (
        <Container my="md">
            <EditionProductModale product={product} />
            <Group justify="space-between">
                <h1>{product.seoTitle || product.title}</h1>
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
                        alt={product.title}
                        fit="contain"
                        mb="xl"
                        mt="xl" />
                    <Space h="lg" />
                    <Divider /></>
            )}

            <p>{product.description}</p>

            <Group gap="xs">
                <Text size="sm">Dimensions:</Text>
                <Badge color="lightgrey" style={{ color: 'black' }}>
                    {product.dimentions.length} x {product.dimentions.width} cm
                </Badge>
            </Group>

            {product.stock !== undefined && (
                <Text size="sm" color={product.stock > 0 ? 'green' : 'red'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Text>
            )}

            <Text size="lg" fw={700} mb="md">
                {product.price}€
            </Text>

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
            <Button mt="xl" color="grey" component={Link} href="/products">Back to Products</Button>
        </Container>
    );
}
