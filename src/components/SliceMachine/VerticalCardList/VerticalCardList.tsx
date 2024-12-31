'use client'

import { Container, Grid } from "@mantine/core";
import { VerticalCard } from "./VerticalCard/VerticalCard";
import { Article, Product } from "@/src/types/Header";

export default function VerticalCardList({ articles, products, type }: { articles: Article[], products?: Product[], type: 'article' | 'product' }) {
    return <Container my='md'>
        <Grid>
            {
                articles ?
                    articles.map((article: Article) => <Grid.Col span={{ base: 12, xs: 4 }} key={article.title}>
                        <VerticalCard article={article} type={type} />
                    </Grid.Col>)
                    : products && products.map((product: Product) => <Grid.Col span={{ base: 12, xs: 4 }} key={product.title}>
                        <VerticalCard product={product} type={type} />
                    </Grid.Col>)
            }
        </Grid>
    </Container>
}