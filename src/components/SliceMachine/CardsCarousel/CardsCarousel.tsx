'use client'

import { Carousel } from '@mantine/carousel';
import { Button, Container, Group, Paper, Space, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './CardsCarousel.module.scss';
import '@mantine/carousel/styles.css';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types/Header';
import Link from 'next/link';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import { fetchProducts } from '@/src/helpers/fetch-products';

interface CardData {
    image: string;
    title: string;
    category: string;
    typeContent?: 'products' | 'articles',
}

interface CardProps {
    title: string,
    cardData: CardData[];
}

function Card({ cardData }: { cardData: CardData }) {
    const dictionary = useDictionary();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            // @ts-ignore
            style={{ backgroundImage: `url(${cardData?.image ?? cardData?.mainImage})` }}
            className={classes.card}
        >
            <div className={classes.content}>
                <h2>{cardData.title}</h2>
                {/* @ts-ignore */}

                <p>{cardData.description}</p>

                <div className={`${classes.section} ${classes.bottomCard}`}>
                    {/* @ts-ignore */}
                    {cardData?.price && (
                        <div>
                            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                {/* @ts-ignore */}
                                {cardData?.price} {dictionary.products.priceLabel}
                            </Text>
                        </div>
                    )}
                    <Space />

                    {/* @ts-ignore */}
                    <Button radius="sm" color='white' variant="outline" fullWidth={!cardData?.price} style={{ flex: 1 }}>
                        {/* @ts-ignore */}
                        {cardData?.price ? dictionary.products.readMore : dictionary.articles.readMore}
                    </Button>
                </div>
            </div>
        </Paper>
    );
}

export function CardsCarousel({ data }: { data: CardProps }) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [dataToDisplay, setDataToDisplay] = useState<Product[] | CardData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await getDataFromCardData(data.cardData);
            setDataToDisplay(result.products);
        };
        fetchData();
    }, []);

    const slides = dataToDisplay.map((item) => (
        <div key={item.title}>
            {/* @ts-ignore */}
            <Link href={`/${data.cardData ? data.cardData + '/' : ''}${item.url ?? item.title.replaceAll(' ', '-')}`} className={classes.link}>
                <Carousel.Slide>
                    {/* @ts-ignore */}
                    <Card cardData={item} />
                </Carousel.Slide>
            </Link></div>
    ));

    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.titleWrapper}>
                    <h1>{data.title}</h1>
                    <img
                        src='https://lesthesdemilie.com/assets/IMAGES/HOME/Separation.png'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                </div>
                <Carousel
                    withIndicators
                    dragFree
                    slideSize={{ base: '50%', md: '33.333333%' }}
                    slideGap={{ base: 3, sm: 'xl' }}
                    align="start"
                    slidesToScroll={mobile ? 1 : 3}
                >
                    {slides}
                </Carousel>
            </Container>
        </section>
    );
}

const getDataFromCardData = async (cardData: CardData[] | 'products' | 'articles') => {
    if (cardData === 'products') {
        const fetchedProducts = await fetchProducts(1, '')

        return fetchedProducts;
    }
}