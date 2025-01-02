'use client';

import { Container, Grid } from "@mantine/core";
import { VerticalCard } from "./VerticalCard/VerticalCard";
import classes from './VerticalCardList.module.scss'
import { Article, Product } from "@/src/types/Header";

export default function VerticalCardList({ articles, products, data }: { articles: Article[], products: Product[], data: any }) {
    return (
        <section className={classes.section}>
            <Container>
                <div className={classes.title}>
                    <h1>{data.title}</h1>
                    <img
                        src='https://lesthesdemilie.com/assets/IMAGES/HOME/Separation.png'
                        alt='Separation'
                        className={`${classes.horizontalSectionDivider} mb-5`}
                    />
                </div>
                <Grid>
                    {Array.isArray(articles) && articles.length > 0
                        ? articles.map((article: any) => (
                            <Grid.Col span={{ base: 12, xs: 4 }} key={article.title}>
                                <VerticalCard article={article} />
                            </Grid.Col>
                        ))
                        : Array.isArray(products) && products.length > 0
                            ? products.map((product: any) => (
                                <Grid.Col span={{ base: 12, xs: 4 }} key={product.title}>
                                    <VerticalCard product={product} />
                                </Grid.Col>
                            ))
                            : null}
                </Grid>
            </Container>
        </section>)
}
