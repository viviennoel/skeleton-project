'use client';

import React, { useEffect, useState } from 'react';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';
import { Editor } from '@/src/components/EditorText/Editor';
import { Button, Input, Group, Container, MultiSelect, Textarea, Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Product } from '@/src/types/Header';
import { useDictionary } from '@/src/dictionaries/dictionary-provider';
import Cookies from 'js-cookie';
import Link from 'next/link';

const ProductEditorPage = () => {
    const dictionary = useDictionary();
    const [titleEn, setTitleEn] = useState<string>('');
    const [titleFr, setTitleFr] = useState<string>('');
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().split('T')[0]);
    const [descriptionEn, setDescriptionEn] = useState<string>('');
    const [descriptionFr, setDescriptionFr] = useState<string>('');
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
    const token = Cookies.get('authToken');

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData: Product = {
            id: crypto.randomUUID(),
            title: { en: titleEn, fr: titleFr },
            mainImage: mainImage || '',
            description: { en: descriptionEn, fr: descriptionFr },
            category,
            price: Number(price),
            dimentions: { width: Number(width), length: Number(length) },
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
                response.status === 400 ? alert("Le produit n'est pas enregistré. Avez vous bien rempli tous les champs?") : alert('une erreur est survenue. Produit non enregistré, veuillez réessayer.')
            }
        } catch (error) {
            console.error('Error submitting the product:', error);
        }
    };

    return (
        <Container size="sm" p="md">
            {token ? <>
                <h1>Create a New Product</h1>

                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <Input
                        name="Title"
                        value={titleFr}
                        onChange={(e) => setTitleFr(e.target.value)}
                        required
                        placeholder="Enter titre du produit - Français"
                        mb="md"
                    />

                    <Input
                        name="Title"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        required
                        placeholder="Enter titre du produit - Anglais"
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
                        value={descriptionFr}
                        onChange={(e) => setDescriptionFr(e.target.value)}
                        required
                        placeholder="Enter la description du produit - Français"
                        mb="md"
                    />
                    <Textarea
                        name="Description"
                        value={descriptionEn}
                        onChange={(e) => setDescriptionEn(e.target.value)}
                        required
                        placeholder="Enter product description - Anglais"
                        mb="md"
                    />

                    {/* dimentions Input */}
                    <Group >
                        <Input
                            name="length"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            required
                            placeholder="Enter length in cm"
                            mb="md"
                        />
                        {/* Length Input */}
                        <Input
                            name="width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            required
                            placeholder="Enter width in cm"
                            mb="md"
                        />
                    </Group>

                    {/* Category Input */}
                    <Select
                        name="Category"
                        value={category}
                        data={['traditional', 'modern', 'personalised']}
                        //@ts-ignore
                        onChange={setCategory}
                        required
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
                        required
                        mb="md"
                    />

                    {/* SEO Title Input */}
                    <Input
                        name="SeoTitle"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Enter SEO title"
                        required
                        mb="md"
                    />

                    {/* SEO Description Input */}
                    <Textarea
                        name="SeoDescription"
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Enter SEO description"
                        required
                        mb="md"
                    />

                    {/* SEO Keywords Input */}
                    <MultiSelect
                        data={seoKeywords}
                        value={seoKeywords}
                        onChange={setSeoKeywords}
                        placeholder="Add SEO keywords"
                        label="SEO Keywords"
                        required
                        mb="md"
                    />

                    {/* Submit Button */}
                    <Group>
                        <Button type="submit" color="blue">
                            Submit Product
                        </Button>
                    </Group>
                </form></>
                :
                <Button color='black' component={Link} href='/login'>Veuillez vous connecter</Button>}
        </Container>
    );
};

export default ProductEditorPage;
