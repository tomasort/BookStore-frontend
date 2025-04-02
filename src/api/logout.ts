import authFetch from '@/api/authFetch';
import { getCsrfToken } from '@/utils';

export default async function logout() {
    return authFetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
    })
}
