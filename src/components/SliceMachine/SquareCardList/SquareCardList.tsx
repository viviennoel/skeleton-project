'use client'

import { Container, Divider, Grid, Space } from "@mantine/core";
import { SquareCard } from "./SquareCard/SquareCard";


export const SquareCardList = ({ services }: { services: any[] }) => {
    return (
        <>
            <Container my="md">
                <Grid gutter="lg">
                    {services.map((service: any) => (
                        <Grid.Col span={4} xs={12} key={service.title}>
                            <SquareCard data={service} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
};
