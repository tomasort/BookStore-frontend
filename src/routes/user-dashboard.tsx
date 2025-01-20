import UserSidebar from "../components/UserSidebar";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { User } from "../types";
import getUserId from "../getUserId";

const DEFAULT_USER_INFO = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    username: 'username',
    phonenumber: 'Phone Number',
    dateOfBirth: 'Date of Birth',
};

const DEFAULT_PASSWORD_FORM = {
    currentPassword: '*******',
    newPassword: '',
    confirmPassword: '',
};


const secondaryNavigation = [
    { name: 'Account', href: '#', current: true },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Integrations', href: '#', current: false },
]

export async function profileLoader(): Promise<User> {

    const userId = getUserId();
    if (!userId) {
        throw new Error('User is not logged in')
    }
    console.log(userId);
    const response = await fetch(`/api/auth/users/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${userId}. Status: ${response.status}`)
    }
    const userData: User = await response.json()
    return userData
}

export default function UserDashboard() {
    const user = useLoaderData() as User;
    console.log(user);

    const [userInfoFormData, setUserInfoFormData] = useState({
        firstName: user.first_name || DEFAULT_USER_INFO.firstName,
        lastName: user.last_name || DEFAULT_USER_INFO.lastName,
        email: user.email || DEFAULT_USER_INFO.email,
        username: user.username || DEFAULT_USER_INFO.username,
        phonenumber: user.phone_number || DEFAULT_USER_INFO.phonenumber,
        dateOfBirth: user.date_of_birth || DEFAULT_USER_INFO.dateOfBirth,
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = e.target.name;
        if (e.target.value === DEFAULT_USER_INFO[fieldName as keyof typeof DEFAULT_USER_INFO]) {
            setUserInfoFormData((prev) => ({
                ...prev,
                [fieldName]: '',
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = e.target.name;
        if (e.target.value === '') {
            setUserInfoFormData((prev) => ({
                ...prev,
                [fieldName]: DEFAULT_USER_INFO[fieldName as keyof typeof DEFAULT_USER_INFO],
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfoFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveUserInfo = async (e) => {
        e.preventDefault();
        console.log('Saving user info');
        const response = await fetch(`/api/auth/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: userInfoFormData.firstName,
                last_name: userInfoFormData.lastName,
                email: userInfoFormData.email,
                username: userInfoFormData.username,
                phone_number: userInfoFormData.phonenumber,
                date_of_birth: userInfoFormData.dateOfBirth,
            }),
        });
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        console.log('Changing password info');
    }

    if (!user) return <p>Loading User details...</p>;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 min-h-screen">
            {/* Static sidebar for desktop */}
            <UserSidebar />

            <div className="xl:col-span-3">
                <main>
                    <header className="border-b border-white/5">
                        {/* Secondary navigation */}
                        <nav className="flex overflow-x-auto py-4">
                            <ul
                                role="list"
                                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                            >
                                {secondaryNavigation.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>

                    {/* Settings forms */}
                    <div className="divide-y divide-white/5">
                        <h1 className="text-2xl font-semibold leading-7 text-gray-900 px-8 pt-4">Settings</h1>
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 ">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>
                            <form className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full flex items-center gap-x-8">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                        />
                                        <div>
                                            <button
                                                type="button"
                                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-white/20"
                                            >
                                                Change avatar
                                            </button>
                                            <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 ">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                autoComplete="given-name"
                                                value={userInfoFormData.firstName}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 ">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                value={userInfoFormData.lastName}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={userInfoFormData.email}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="username" className="block text-sm font-medium leading-6 ">
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                                <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                                                    bookstore.com/
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="username"
                                                    value={userInfoFormData.username}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="flex-1 border-0 bg-transparent py-1.5 pl-1  focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        onClick={(event) => handleSaveUserInfo(event)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 ">Change password</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    Update your password associated with your account.
                                </p>
                            </div>

                            <form className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="current-password" className="block text-sm font-medium leading-6 ">
                                            Current password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="current-password"
                                                name="current_password"
                                                type="password"
                                                autoComplete="current-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 ">
                                            New password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="new-password"
                                                name="new_password"
                                                type="password"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 ">
                                            Confirm password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm-password"
                                                name="confirm_password"
                                                type="password"
                                                autoComplete="new-password"
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        onClick={(event) => handleChangePassword(event)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
