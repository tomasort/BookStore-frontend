import getCsrfToken from '../getCsrfToken';

const logout = (): void => {
    sessionStorage.removeItem('userId');
    sessionStorage.setItem('userStatus', 'loggedOut');
};

export default function Logout() {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken()
                }
            });
            console.log(response);
            // Clear user ID from session storage
            logout();
            // Redirect to login page or home page
            window.location.href = '/login';
        } catch (err: any) {
            console.error(err.message);
        }
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
