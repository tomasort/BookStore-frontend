import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function getCsrfToken(): string {
    return document.cookie.split('; ').find(row => row.startsWith('csrf_access_token'))?.split('=')[1] ?? '';
}


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) {
        return '/images/CasaDelLibro/covers/defecto1.jpg'
    }
    return `/images/${imagePath}`
}
