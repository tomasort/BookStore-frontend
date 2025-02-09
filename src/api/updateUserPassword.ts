import { getCsrfToken } from '@/utils';
import authFetch from './authFetch';

interface UpdateUserPasswordParams {
    userId: number | string | undefined,
    passwordFormData: {
        current_password: string,
        new_password: string
    }
}

interface UpdateUserPasswordResponse {
}

export default async function updateUserPassword({ userId, passwordFormData }: UpdateUserPasswordParams): Promise<UpdateUserPasswordResponse> {
    const response = await authFetch(`/api/auth/users/${userId}/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
            current_password: passwordFormData.current_password,
            new_password: passwordFormData.new_password,
        }),
    });
    return response.json();
}
