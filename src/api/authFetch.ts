export default async function authFetch(url: string, options = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: 'include' // Ensure cookies are sent
    });

    if (response.status === 401) {
        sessionStorage.removeItem('userId');
        window.location.href = '/login';
        console.log('Unauthorized, removing userId from localStorage');
        throw new Error('Unauthorized');
    }

    return response;
}
