export interface Author {
    id: number;
    name: string;
    photo_url: string | null;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Publisher {
    id: number;
    name: string;
}

export interface BookDetailsData {
    id: number;
    title: string;
    subtitle: string | null;
    authors: Author[];
    description: string | null;
    cover_url: string | null;
    genres: Genre[];
    publishers: Publisher[];
    average_cost_alejandria: string | null;
    bar_code_alejandria: string | null;
    code_alejandria: string;
    cost: string;
    cost_supplier: string | null;
    current_price: string;
    previous_price: string | null;
    price_alejandria: string | null;
    iva: string | null;
    last_cost_alejandria: string | null;
    stock: number;
    stock_alejandria: number;
    stock_consig: number;
    stock_consig_alejandria: number;
    isbn_10: string | null;
    isbn_13: string | null;
    isbn_alejandria: string | null;
    number_of_pages: number | null;
    physical_format: string | null;
    physical_dimensions: string | null;
    weight: string | null;
    publish_date: string | null;
    publish_places: string[]; // Array of place names
    series: string[]; // Array of series names
    rating: number | null;
    edition_name: string | null;
    languages: string[]; // Array of language names
}

export interface BookCardData {
    id: number;
    title: string;
    subtitle: string | null;
    isbn_10: string | null;
    isbn_13: string | null;
    authors: Author[];
    series: string[];
    publishers: Publisher[];
    genres: Genre[];
    previous_price: number | null;
    current_price: number;
    cover_url: string | null;
    rating: number | null;
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
    favorites: BookCardData[]; // Adjust the type as needed
    orders: any[]; // Adjust the type as needed
    wishlist: BookCardData[]; // Adjust the type as needed
}

export interface CartItem {
    id: number;
    quantity: number;
    book: BookCardData;
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
