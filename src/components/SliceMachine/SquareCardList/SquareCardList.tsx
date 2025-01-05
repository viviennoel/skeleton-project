'use client'

import { Container, Divider, Grid, Space } from "@mantine/core";
import { SquareCard } from "./SquareCard/SquareCard";
import { useParams } from "next/navigation";


export const SquareCardList = ({ services }: { services: any[] }) => {
    const { lang } = useParams();
    return (
        <>
            <Container my="md">
                <Grid gutter="lg">
                    {services.map((service: any) => (
                        // @ts-ignore
                        <Grid.Col span={{ base: 12, sm: 4 }} key={service.title[lang] ? service.title[lang] : service.title}>
                            <SquareCard data={service} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
};
