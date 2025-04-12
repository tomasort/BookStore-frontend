export interface Author {
    id: number;
    name: string;
    photo_url?: string | null;
    biography?: string | null;
    birth_date?: string | null;
    death_date?: string | null;
    books?: Book[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Language {
    id: number;
    name: string;
}

export interface Publisher {
    id: number;
    name: string;
}

export interface Series {
    id: number;
    name: string;
}

export interface Book {
    // Core book properties - always required
    id: number;
    title: string;

    // Common book properties - sometimes optional
    subtitle?: string | null;
    authors?: Author[];
    cover_url?: string | null;
    genres?: Genre[];
    publishers?: Publisher[];
    isbn_10?: string | null;
    isbn_13?: string | null;
    series?: Series[] | string[];
    rating?: number | null;

    // Card-specific properties
    previous_price?: number | string | null;
    current_price?: number;

    // Details-specific properties
    description?: string | null;
    average_cost_alejandria?: string | null;
    bar_code_alejandria?: string | null;
    code_alejandria?: string;
    cost?: string;
    cost_supplier?: string | null;
    iva?: string | null;
    last_cost_alejandria?: string | null;
    stock?: number;
    stock_alejandria?: number;
    stock_consig?: number;
    stock_consig_alejandria?: number;
    isbn_alejandria?: string | null;
    number_of_pages?: number | null;
    physical_format?: string | null;
    physical_dimensions?: string | null;
    weight?: string | null;
    publish_date?: string | null;
    publish_places?: string[];
    edition_name?: string | null;
    languages?: Language[];
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    date_of_birth: string | null;
    phone_number: string | null;
    account_type: string;
    active: boolean;
    created_at: string;
    last_login: string | null;
    newsletter_subscription: boolean;
    password_hash: string;
    preferred_language: string;
    role: string;
    session_token: string | null;
    shipping_address: string | null;
    shipping_city: string | null;
    shipping_country: string | null;
    shipping_postal_code: string | null;
    shipping_state: string | null;
    status: string;
    id_number: string | null;
    id_type: string | null;
    favorites: Book[]; // Adjust the type as needed
    orders: any[]; // Adjust the type as needed
    wishlist: Book[]; // Adjust the type as needed
}

export interface CartItem {
    id: number;
    quantity: number;
    book: Book;
    in_stock: boolean;
}

export interface Review {
    id: number;
    user: User;
    rating: number;
    comment: string;
    created_at: string;
}

interface ReviewCounts {
    rating: number;
    count: number;
}
export interface ReviewsData {
    reviews: Review[];
    total_count: number;
    average_rating: number;
    counts: ReviewCounts[];
}

export interface PaginationData {
    has_next: boolean,
    has_prev: boolean,
    page: number,
    pages: number,
    per_page: number,
    total: number
}
