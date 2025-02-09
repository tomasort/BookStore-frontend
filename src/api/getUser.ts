import authFetch from './authFetch';
import { User } from '../types';

export default async function getUser({ userId }: { userId: number | null | string }): Promise<User> {
    console.log('Fetching user with ID', userId);
    if (!userId) {
        throw new Error('No user ID provided');
    }
    const response = await authFetch(`/api/auth/users/${userId}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${userId}. Status: ${response.status}`)
    }
    return response.json();
}
