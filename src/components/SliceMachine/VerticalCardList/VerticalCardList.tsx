'use client'

import { Container, Grid } from "@mantine/core";
import { VerticalCard } from "./VerticalCard/VerticalCard";

export default function VerticalCardList() {
    return <Container my='md'>
        <Grid>
            <Grid.Col span={{ base: 12, xs: 4 }}><VerticalCard /></Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}><VerticalCard /></Grid.Col>
            <Grid.Col span={{ base: 12, xs: 4 }}><VerticalCard /></Grid.Col>
        </Grid>
    </Container>
}