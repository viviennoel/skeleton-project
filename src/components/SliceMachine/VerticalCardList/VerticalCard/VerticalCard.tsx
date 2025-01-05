'use client'

import { Badge, Button, Card, Center, Group, Space, Text } from '@mantine/core';
import classes from './VerticalCard.module.scss';
import Image from 'next/image';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Link from 'next/link';
import { Article, Product } from '@/src/types/Header';
import { useParams } from 'next/navigation';

export function VerticalCard({ article, product }: { article?: Article, product?: Product }) {
    const dictionary = useDictionary();
    const cardData = article ? article : product;
    const date = new Date(article ? (cardData as Article)?.createdAt : '');
    const params = useParams();
    const lang = params.lang ?? 'fr';

    const formattedDate = article ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',  // Two-digit day
        month: 'long',   // Full month name
        year: 'numeric', // Full year
    }).format(date) : '';

    const link = article
        ? `/articles/${article?.title?.replaceAll(' ', '-')}`
        // @ts-ignore
        : `/products/${product?.title[lang]?.replaceAll(' ', '-')}`;

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                {article && <Badge color='grey' className={classes.date}>{formattedDate}</Badge>}
                <Image src={cardData?.mainImage ?? ''} alt={cardData?.title ?? ''} fill={true} style={{ objectFit: "cover" }} />
            </Card.Section>

            <Group justify="space-between" mt="md" w='100%'>
                <div className={classes.title}>
                    <Text fw={500}>{cardData?.title[lang] ?? cardData?.title}</Text>
                    <Text fz="xs" c="dimmed">
                        {article ? dictionary.articles.label : dictionary.products.label}
                    </Text>
                </div>
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    {cardData?.description[lang] ?? cardData?.description}
                </Text>
            </Card.Section>

            <Space h='lg' />
            <Space h='lg' />
            <Space h='lg' />

            <Card.Section className={`${classes.section} ${classes.bottomCard}`}>
                <Group gap={30}>
                    {product && (
                        <div>
                            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                {/* @ts-ignore */}
                                {cardData?.price} {dictionary.products.priceLabel}
                            </Text>
                            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                                L'unité
                            </Text>
                        </div>
                    )}


                    <Link href={link} className={!product ? classes.link : ''}>
                        <Button radius="sm" color='black' fullWidth={!product} style={{ flex: 1 }}>
                            {article ? dictionary.articles.readMore : dictionary.products.readMore}
                        </Button>
                    </Link>
                </Group>
            </Card.Section>
        </Card>
    );
}