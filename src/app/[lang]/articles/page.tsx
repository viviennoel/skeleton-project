'use client';

import React, { useState, useEffect } from 'react';
import { Container, Input, Pagination, Group } from '@mantine/core';
import VerticalCardList from '@/src/components/SliceMachine/VerticalCardList/VerticalCardList';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Image from 'next/image';

interface Article {
    id: string;
    title: string;
    tags: string[];
    mainImage: string;
    createdAt: string;
    description: string;
    content: string;
    author?: string;
    category?: string;
}

async function fetchArticles(page: number, searchQuery: string): Promise<Article[]> {
    try {
        const response = await fetch(`/api/articles?page=${page}&query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const dictionary = useDictionary();

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await fetchArticles(page, searchQuery);
            setArticles(result.articles);
            setTotalPages(result.totalPages);
        };
        fetchData();
    }, [page, searchQuery]);

    return (
        <Container my="md">
            {/* TODO: Refactor to use the same component in article and product */}
            <Group align='center'>
                <Image src="https://img.icons8.com/c9a456/ios-filled/50/search--v1.png" alt="search" height={20} width={20} />
                {/* @ts-ignore */}
                <p>{dictionary.pages.products.search}</p>
            </Group>
            <Input
                placeholder="Search by title or tag"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                mb="lg"
            />

            {/* @ts-ignore */}
            <VerticalCardList articles={articles} data={dictionary.pages.articles} />

            <Group mt="lg">
                <Pagination
                    // @ts-ignore
                    page={page}
                    onChange={setPage}
                    total={totalPages}
                    color='black'
                />
            </Group>
        </Container>
    );
};

export default ArticlesPage;
