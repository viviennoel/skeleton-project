'use client';

import React, { useState } from 'react';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Button, Input, Group, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Editor } from '@/src/components/EditorText/Editor';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';

type BlogArticleData = {
    title: string;
    date: string;
    content: string;
    mainImage: string;
};

const BlogEditorPage = () => {
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [editorContent, setEditorContent] = useState<string>('');
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const articleData: BlogArticleData = {
            title,
            date,
            content: editorContent,
            mainImage: imageUrl || '',
        };

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                console.log('Article saved successfully');
                router.push('/');
            } else {
                console.error('Failed to save the article');
            }
        } catch (error) {
            console.error('Error submitting the article:', error);
        }
    };

    return (
        <Container size="sm" p="md">
            <h1>Create a New Blog Post</h1>

            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <Input
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter your article title"
                    mb="md"
                />

                {/* Main Image Upload (using Mantine's Dropzone) */}
                <DropzoneCloudinary setImageUrl={setImageUrl} imageUrl={imageUrl} />

                {/* Date Input */}
                <Input
                    name="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    mb="md"
                />

                {/* Text Editor */}
                <Editor setEditorContent={setEditorContent} />

                {/* Submit Button */}
                <Group>
                    <Button type="submit" color="blue">
                        Submit Article
                    </Button>
                </Group>
            </form>
        </Container>
    );
};

export default BlogEditorPage;
