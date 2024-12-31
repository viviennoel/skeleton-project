'use client';

import React, { useState } from 'react';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';
import { Editor } from '@/src/components/EditorText/Editor';
import { Button, Input, Group, Container, MultiSelect, Textarea } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Product } from '@/src/types/Header';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';

const ProductEditorPage = () => {
    const dictionary = useDictionary();
    const [title, setTitle] = useState<string>('');
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [width, setWidth] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [author, setAuthor] = useState<string>('Franck Sabet');
    const [category, setCategory] = useState<string>('');
    const [tags, setTags] = useState<string[]>(dictionary.seoTags);
    const [seoTitle, setSeoTitle] = useState<string>('');
    const [seoDescription, setSeoDescription] = useState<string>('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>(dictionary.seoTags);
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData: Product = {
            id: crypto.randomUUID(),
            title,
            mainImage: mainImage || '',
            description,
            category,
            price,
            dimentions: { width, length },
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                console.log('Product saved successfully');
                router.push('/products');
            } else {
                console.error('Failed to save the product');
            }
        } catch (error) {
            console.error('Error submitting the product:', error);
        }
    };

    return (
        <Container size="sm" p="md">
            <h1>Create a New Product</h1>

            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <Input
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter product title"
                    mb="md"
                />

                {/* Main Image Upload */}
                <DropzoneCloudinary setImageUrl={setMainImage} imageUrl={mainImage} />

                {/* Creation Date Input */}
                <Input
                    name="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price in €"
                    required
                    mb="md"
                />

                {/* Description Input */}
                <Textarea
                    name="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter product description"
                    mb="md"
                />

                {/* dimentions Input */}
                <Group >
                    <Input
                        name="length"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter length in cm"
                        mb="md"
                    />
                    {/* Length Input */}
                    <Input
                        name="width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Enter width in cm"
                        mb="md"
                    />
                </Group>

                {/* Category Input */}
                <Input
                    name="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter product category"
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

                {/* Submit Button */}
                <Group>
                    <Button type="submit" color="blue">
                        Submit Product
                    </Button>
                </Group>
            </form>
        </Container>
    );
};

export default ProductEditorPage;
