import React from 'react';

const logout = (): void => {
    sessionStorage.removeItem('userId');
};

const Logout: React.FC = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Clear user ID from session storage
            logout();

            // Redirect to login page or home page
            window.location.href = '/login';
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
