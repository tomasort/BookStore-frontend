export default async function login(formData: { username: string, password: string }): Promise<{ message: string, user_id: string }> {
    console.log("doing login")
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.username,
            password: formData.password
        }),
        credentials: 'include'
    })
    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }
    return response.json();
}

