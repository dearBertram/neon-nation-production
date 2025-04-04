import { PoetDocument } from '../models/poets.ts';

export async function fetchPoetDocument(): Promise<PoetDocument> {
    const response = await fetch("/nn-poet-static.json");
    if (!response.ok) {
        throw new Error("Failed to load static poet data");
    }
    return await response.json();
}