'use client';

import { Container, Grid } from "@mantine/core";
import { VerticalCard } from "./VerticalCard/VerticalCard";
import classes from './VerticalCardList.module.scss'
import { Article } from "@/src/types/Header";

export default function VerticalCardList({ type, articles }: { type: "article" | "product", articles: Article[] }) {
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
                        //@ts-ignore
                        : Array.isArray(products) && products.length > 0
                            //@ts-ignore
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
