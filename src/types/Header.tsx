export type HeaderLinks = { label: string, link: string, size?: string, links?: { label: string, link: string, size?: string }[] }[]

export type Locale = 'fr' | 'en'

export interface Article {
    id: string;
    title: string;
    mainImage: string;
    createdAt: string;
    description: string;
    content: string;
    author?: string;
    category?: string;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export interface Product {
    id: string;
    title: string;
    mainImage: string;
    dimentions: {
        length: number,
        width: number
    }
    price: number;
    description: string;
    category?: string;
    tags?: string[];
    stock?: number;
    rating?: number;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}