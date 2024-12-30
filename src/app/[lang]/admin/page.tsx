'use client'

import React, { useState, useEffect } from 'react';
import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Underline } from '@tiptap/extension-underline';
import { ListItem } from '@tiptap/extension-list-item';
import { HardBreak } from '@tiptap/extension-hard-break';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Mention } from '@tiptap/extension-mention';
import { Table } from '@tiptap/extension-table';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { Button, Input, Textarea, Group, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Editor } from '@/src/components/EditorText/Editor';

type BlogArticleData = {
    title: string;
    date: string;
    content: string;
    mainImage: string;
};

const BlogEditorPage = () => {
    const [title, setTitle] = useState<string>('');
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [editorContent, setEditorContent] = useState<string>('');
    const router = useRouter();

    // Handle image upload for the main image
    const handleDrop = (acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];
        setMainImage(file);
        setImageUrl(URL.createObjectURL(file)); // Preview the uploaded image
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                <Dropzone
                    onDrop={handleDrop}
                    accept={["image/*"]}
                    multiple={false}
                    style={{
                        border: '2px dashed #0070f3',
                        borderRadius: '5px',
                        padding: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        {!imageUrl ? (
                            <p>Drag & drop your main image here, or click to select</p>
                        ) : (
                            <img
                                src={imageUrl}
                                alt="Main Image"
                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </Dropzone>

                {/* Date Input */}
                <Input
                    name="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    mb="md"
                />

                <Editor />

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
