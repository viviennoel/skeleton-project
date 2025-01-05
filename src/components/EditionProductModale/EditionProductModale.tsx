'use client';

import { useState } from 'react';
import { Button, Modal, Group, Input, Textarea, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';
import { Product } from '@/src/types/Header';

export const EditionProductModale = ({ product }: { product: Product }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { lang } = useParams();
    // @ts-ignore
    const [title, setTitle] = useState(product.title[lang]);
    const [mainImage, setMainImage] = useState<string | null>(product.mainImage);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());
    const [length, setLength] = useState(product.dimentions.length.toString());
    const [width, setWidth] = useState(product.dimentions.width.toString());
    const [category, setCategory] = useState(product.category || '');
    const [tags, setTags] = useState(product.tags || []);
    const [seoTitle, setSeoTitle] = useState(product.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(product.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState(product.seoKeywords || []);
    const router = useRouter();

    const saveProduct = async () => {
        const updatedProduct: Product = {
            ...product,
            title,
            mainImage: mainImage || '',
            description,
            price: parseFloat(price),
            dimentions: {
                length: parseFloat(length),
                width: parseFloat(width),
            },
            category,
            tags,
            seoTitle,
            seoDescription,
            seoKeywords,
        };

        // @ts-ignore
        const response = await fetch(`/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            console.error('Failed to save product.');
        } else {
            console.log('Product saved successfully.');
            close();
            router.refresh();
        }
    };

    const deleteProduct = async () => {
        // @ts-ignore
        const response = await fetch(`/api/products/${product._id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error('Failed to delete product.');
        } else {
            console.log('Product deleted successfully.');
            router.push('/products');
        }
    };

    return (
        <>
            <Group>
                <Button onClick={open} color="green">
                    Edit Product
                </Button>
                <Button onClick={deleteProduct} color="red">
                    Delete Product
                </Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Edit Product">
                <Input
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter product title"
                    mb="sm"
                />

                <DropzoneCloudinary setImageUrl={setMainImage} imageUrl={mainImage} />

                <Input
                    name="Price (€)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price"
                    mb="sm"
                />

                <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    mb="sm"
                />

                <Group mb="sm">
                    <Input
                        name="Length (cm)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter length"
                    />
                    <Input
                        name="Width (cm)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Enter width"
                    />
                </Group>

                <Input
                    name="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter product category"
                    mb="sm"
                />

                <MultiSelect
                    label="Tags"
                    data={tags}
                    value={tags}
                    onChange={setTags}
                    placeholder="Add tags"
                    mb="sm"
                />

                <Input
                    name="SEO Title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Enter SEO title"
                    mb="sm"
                />

                <Textarea
                    label="SEO Description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Enter SEO description"
                    mb="sm"
                />

                <MultiSelect
                    label="SEO Keywords"
                    data={seoKeywords}
                    value={seoKeywords}
                    onChange={setSeoKeywords}
                    placeholder="Add SEO keywords"
                    mb="sm"
                />

                <Button onClick={saveProduct} color="blue" fullWidth mt="md">
                    Save Changes
                </Button>
            </Modal>
        </>
    );
};
