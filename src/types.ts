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

export interface BookData {
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

