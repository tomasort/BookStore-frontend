
export default function getUserId(): string | null {
    return sessionStorage.getItem('userId');
}
