'use client'

import { useDictionary } from "@/src/dictionaries/dictionary-provider";
import { Button, Container, Group, Space } from "@mantine/core";
import Link from "next/link";

export default function Error404() {
    const dictionary = useDictionary();
    return (
        <Container my='md' style={{ textAlign: 'center' }}>
            <Space h='lg' />
            <h1>{dictionary.error404.title}</h1>
            <h2>{dictionary.error404.subtitle}</h2>
            <Space h='lg' />
            <Space h='lg' />
            <Space h='lg' />
            <Group justify="space-between" grow>
                <Button component={Link} color='darkRed' href="/">{dictionary.error404.returnHomepage}</Button>
                <Button component={Link} color='darkRed' href="/articles">{dictionary.error404.returnArticles}</Button>
                <Button component={Link} color='darkRed' href="/products">{dictionary.error404.returnProducts}</Button>
            </Group>
        </Container>
    )
}