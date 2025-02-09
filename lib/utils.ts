import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getBaseUrl() {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        throw new Error('BASE_URL is not defined');
    }

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return `${protocol}://${baseUrl}`;
}
