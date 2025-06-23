export interface EntityRecord {
    id: number,
    name: string
}

export interface Paginated<T> {
    results: Array<T>;
    offset: number;
    number: number;
    totalResults: number;
}

