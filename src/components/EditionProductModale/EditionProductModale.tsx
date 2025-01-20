'use client';

import { useState } from 'react';
import { Button, Modal, Group, Input, Textarea, MultiSelect, InputLabel } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { DropzoneCloudinary } from '@/src/components/EditorText/Dropzone';
import { Product } from '@/src/types/Header';

export const EditionProductModale = ({ product }: { product: Product }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { lang } = useParams();
    // @ts-ignore
    const [titleEn, setTitleEn] = useState(product.title.en ?? product.title);
    const [titleFr, setTitleFr] = useState(product.title.fr ?? product.title);
    const [mainImage, setMainImage] = useState<string | null>(product.mainImage);
    const [descriptionEn, setDescriptionEn] = useState(product.description.fr ?? product.description);
    const [descriptionFr, setDescriptionFr] = useState(product.description.en ?? product.description);
    const [price, setPrice] = useState(product.price?.toString());
    const [length, setLength] = useState(product.dimentions.length?.toString());
    const [width, setWidth] = useState(product.dimentions.width?.toString());
    const [category, setCategory] = useState(product.category || '');
    const [tags, setTags] = useState(product.tags || []);
    const [seoTitle, setSeoTitle] = useState(product.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(product.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState(product.seoKeywords || []);
    const router = useRouter();

    const saveProduct = async () => {
        const updatedProduct: Product = {
            ...product,
            title: { en: titleEn, fr: titleFr },
            mainImage: mainImage || '',
            description: { en: descriptionEn, fr: descriptionFr },
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
            router.push('/products')
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
                <InputLabel>Titre Français</InputLabel>
                <Input
                    name="Title"
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    required
                    placeholder="Enter le titre du produit - Français"
                    mb="sm"
                />
                <InputLabel>Titre Anglais</InputLabel>
                <Input
                    name="Title"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                    placeholder="Enter product title - Anglais"
                    mb="sm"
                />

                <DropzoneCloudinary setImageUrl={setMainImage} imageUrl={mainImage} />

                <InputLabel>Prix</InputLabel>
                <Input
                    name="Price (€)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Enter product price"
                    mb="sm"
                />
                <Textarea
                    label="Description Française"
                    value={descriptionFr}
                    onChange={(e) => setDescriptionFr(e.target.value)}
                    required
                    placeholder="Enter la description du produit - Français"
                    mb="sm"
                />
                <Textarea
                    label="Description Anglaise"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    required
                    placeholder="Enter product description - Anglais"
                    mb="sm"
                />

                <Group mb="sm">
                    <InputLabel>Longueur</InputLabel>
                    <Input
                        name="Length (cm)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        required
                        placeholder="Enter length"
                    />
                    <InputLabel>Largeur</InputLabel>
                    <Input
                        name="Width (cm)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        required
                        placeholder="Enter width"
                    />
                </Group>
                <InputLabel>Catégorie</InputLabel>
                <Input
                    name="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder="Enter product category"
                    mb="sm"
                />

                <MultiSelect
                    label="Tags"
                    data={tags}
                    value={tags}
                    onChange={setTags}
                    required
                    placeholder="Add tags"
                    mb="sm"
                />

                <InputLabel>Titre SEO</InputLabel>
                <Input
                    name="SEO Title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    required
                    placeholder="Enter SEO title"
                    mb="sm"
                />

                <Textarea
                    label="SEO Description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    required
                    placeholder="Enter SEO description"
                    mb="sm"
                />

                <MultiSelect
                    label="SEO Keywords"
                    data={seoKeywords}
                    value={seoKeywords}
                    onChange={setSeoKeywords}
                    required
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
