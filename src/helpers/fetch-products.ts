import { Product } from "../types/Header";

export async function fetchProducts(page: number, searchQuery: string): Promise<Product[]> {
    try {
        const response = await fetch(`/api/products?page=${page}&query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}