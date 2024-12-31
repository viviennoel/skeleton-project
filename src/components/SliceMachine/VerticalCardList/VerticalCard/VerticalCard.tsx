'use client'

import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { Badge, Button, Card, Center, Group, Text } from '@mantine/core';
import classes from './VerticalCard.module.scss';
import Image from 'next/image';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Link from 'next/link';
import { Article, Product } from '@/src/types/Header';

const mockdata = [
    { label: '4 passengers', icon: IconUsers },
    { label: '100 km/h in 4 seconds', icon: IconGauge },
    { label: 'Automatic gearbox', icon: IconManualGearbox },
    { label: 'Electric', icon: IconGasStation },
];

export function VerticalCard({ article, product }: { article?: Article, product?: Product, type: 'article' | 'product' }) {
    const dictionary = useDictionary();
    const cardData = article ? article : product;
    const link = article
        ? `/articles/${article?.title.replaceAll(' ', '-')}`
        : `/products/${product?.title?.replaceAll(' ', '-')}`;

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src={cardData?.mainImage ?? ''} alt={cardData?.title ?? ''} fill={true} style={{ objectFit: "cover" }} />
            </Card.Section>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fw={500}>{cardData?.title ?? ''}</Text>
                    <Text fz="xs" c="dimmed">
                        {article ? dictionary.articles.label : dictionary.products.label}
                    </Text>
                </div>
                {article && <Badge variant="outline" color='black'>{cardData?.createdAt ?? ''}</Badge>}
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    {cardData?.description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>
                    {product && (
                        <div>
                            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                {cardData?.price} {dictionary.products.priceLabel}
                            </Text>
                            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                                L'unité
                            </Text>
                        </div>
                    )}


                    <Link href={link} className={classes.link}>
                        <Button radius="sm" color='black' style={{ flex: 1 }}>
                            {article ? dictionary.articles.readMore : dictionary.products.readMore}
                        </Button>
                    </Link>
                </Group>
            </Card.Section>
        </Card>
    );
}