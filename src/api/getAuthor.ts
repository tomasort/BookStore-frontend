import { Author } from '../types';

export default async function getAuthor(authorId: string | undefined): Promise<Author> {
    const response = await fetch(`/api/api/authors/${authorId}`);
    const authorData: Author = await response.json();
    return authorData;
}
