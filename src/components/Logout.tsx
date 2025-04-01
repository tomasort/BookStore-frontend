import { useMutation } from '@tanstack/react-query';
import authFetch from '@/api/authFetch';
import { getCsrfToken } from '@/utils';

async function logout() {
    return authFetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
    })
}

export default function Logout() {
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            sessionStorage.removeItem('userId');
            window.location.href = '/login';
        }
    })

    const handleLogout = async () => {
        logoutMutation.mutate();
    };

    return (

        <button
            onClick={handleLogout}
            className="hover:text-blue-200 font-medium transition duration-300"
        >
            Logout
        </button>
    )


}
