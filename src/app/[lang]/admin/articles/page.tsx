'use client';

import React, { useState } from 'react';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';
import { Editor } from '@/src/components/EditorText/Editor';
import { Button, Input, Group, Container, MultiSelect, Textarea } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { Article } from '@/src/types/Header';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Cookies from 'js-cookie';
import Link from 'next/link';

const ArticleEditorPage = () => {
    const dictionary = useDictionary();
    const [title, setTitle] = useState<string>('');
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [author, setAuthor] = useState<string>('Franck Sabet');
    const [category, setCategory] = useState<string>('');
    const [tags, setTags] = useState<string[]>(dictionary.seoTags);
    const [seoTitle, setSeoTitle] = useState<string>('');
    const [seoDescription, setSeoDescription] = useState<string>('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>(dictionary.seoTags);
    const router = useRouter();
    const token = Cookies.get('authToken');
    const params = useParams<{ lang: string }>()

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const articleData: Article = {
            id: crypto.randomUUID(),
            title,
            mainImage: mainImage || '',
            createdAt,
            description,
            content,
            author,
            category,
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
            lang: params.lang
        };

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                console.log('Article saved successfully');
                router.push('/articles');
            } else {
                console.error('Failed to save the article');
            }
        } catch (error) {
            console.error('Error submitting the article:', error);
        }
    };

    return (
        <Container size="sm" p="md">
            {token ?
                <><h1>Create a New Article</h1>

                    <form onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <Input
                            name="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter article title"
                            mb="md"
                        />

                        {/* Main Image Upload */}
                        <DropzoneCloudinary setImageUrl={setMainImage} imageUrl={mainImage} />

                        {/* Creation Date Input */}
                        <Input
                            name="CreatedAt"
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            required
                            mb="md"
                        />

                        {/* Description Input */}
                        <Textarea
                            name="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter article description"
                            mb="md"
                        />

                        {/* Author Input */}
                        <Input
                            name="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                            mb="md"
                        />

                        {/* Category Input */}
                        <Input
                            name="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter article category"
                            mb="md"
                        />

                        {/* Tags Input */}
                        <MultiSelect
                            data={tags}
                            value={tags}
                            onChange={setTags}
                            placeholder="Add tags"
                            label="Tags"
                            mb="md"
                        />

                        {/* SEO Title Input */}
                        <Input
                            name="SeoTitle"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            placeholder="Enter SEO title"
                            mb="md"
                        />

                        {/* SEO Description Input */}
                        <Textarea
                            name="SeoDescription"
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            placeholder="Enter SEO description"
                            mb="md"
                        />

                        {/* SEO Keywords Input */}
                        <MultiSelect
                            data={seoKeywords}
                            value={seoKeywords}
                            onChange={setSeoKeywords}
                            placeholder="Add SEO keywords"
                            label="SEO Keywords"
                            mb="md"
                        />

                        {/* Content Editor */}
                        <Editor setEditorContent={setContent} />

                        {/* Submit Button */}
                        <Group>
                            <Button type="submit" color="blue">
                                Submit Article
                            </Button>
                        </Group>
                    </form></>
                :
                <Button color='black' component={Link} href='/login'>Veuillez vous connecter</Button>}
        </Container>
    );
};

export default ArticleEditorPage;
