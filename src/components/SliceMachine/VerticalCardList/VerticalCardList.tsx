'use client';

import { useEffect, useState } from "react";
import { Container, Grid } from "@mantine/core";
import { VerticalCard } from "./VerticalCard/VerticalCard";
import classes from './VerticalCardList.module.scss'

export default function GridPresentation({ type }: { type: "article" | "product" }) {
    const [articles, setArticles] = useState<any[] | null>(null);
    const [products, setProducts] = useState<any[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/getData");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const { articles, products } = await response.json();
                setArticles(articles);
                setProducts(products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <section className={classes.section}>
            <Container>
                <h1>Nos produits</h1>
                <Grid>
                    {Array.isArray(articles) && articles.length > 0
                        ? articles.map((article: any) => (
                            <Grid.Col span={{ base: 12, xs: 4 }} key={article.title}>
                                <VerticalCard article={article} type={type} />
                            </Grid.Col>
                        ))
                        : Array.isArray(products) && products.length > 0
                            ? products.map((product: any) => (
                                <Grid.Col span={{ base: 12, xs: 4 }} key={product.title}>
                                    <VerticalCard product={product} type={type} />
                                </Grid.Col>
                            ))
                            : null}
                </Grid>
            </Container>
        </section>)
}
