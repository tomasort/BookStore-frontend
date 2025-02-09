import getCsrfToken from "@/getCsrfToken";
import authFetch from "./authFetch";

interface UpdateUserInfoParams {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    phonenumber: string,
    dateOfBirth: string,

}

export default async function updateUserInfo({ userId, formData }: { userId: string | number | undefined, formData: UpdateUserInfoParams }) {
    const response = await authFetch(`/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            username: formData.username,
            phone_number: formData.phonenumber,
            date_of_birth: formData.dateOfBirth,
        }),
    });
    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }
    return response.json();
}
