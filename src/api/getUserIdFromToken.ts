import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string; // Adjust the property names based on your token payload
    exp: number;
}

// Function to get the value of a specific cookie by name
const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
};

const getUserIdFromToken = (): string | null => {
    const token = getCookie('access_token_cookie');
    if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.userId;
    }
    return null;
};

export default getUserIdFromToken;
