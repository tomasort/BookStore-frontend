import UserSidebar from "../components/UserSidebar";
import { useState, useEffect } from "react";
import updateUserInfo from "@/api/updateUserInfo";
import { useMutation } from "@tanstack/react-query";
import updateUserPassword from "@/api/updateUserPassword";
import { useUser } from "@/context/UserContext";

const DEFAULT_USER_INFO = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    username: 'username',
    phonenumber: 'Phone Number',
    dateOfBirth: 'Date of Birth',
};

const userInfoFields = [
    { label: 'First name', name: 'firstName', type: 'text', autoComplete: 'given-name' },
    { label: 'Last name', name: 'lastName', type: 'text', autoComplete: 'family-name' },
    { label: 'Email address', name: 'email', type: 'email', autoComplete: 'email' },
    { label: 'Username', name: 'username', type: 'text', autoComplete: 'username' },
    { label: 'Phone number', name: 'phonenumber', type: 'text', autoComplete: 'tel' },
    { label: 'Date of Birth', name: 'dateOfBirth', type: 'text', autoComplete: 'bday' },
];


const secondaryNavigation = [
    { name: 'Account', href: '#', current: true },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Integrations', href: '#', current: false },
]


export default function UserDashboard() {
    const { user, refetchUser } = useUser();
    const [userInfoUpdated, setUserInfoUpdated] = useState(false);
    const [userInfoFormData, setUserInfoFormData] = useState({
        firstName: user?.first_name || DEFAULT_USER_INFO.firstName,
        lastName: user?.last_name || DEFAULT_USER_INFO.lastName,
        email: user?.email || DEFAULT_USER_INFO.email,
        username: user?.username || DEFAULT_USER_INFO.username,
        phonenumber: user?.phone_number || DEFAULT_USER_INFO.phonenumber,
        dateOfBirth: user?.date_of_birth || DEFAULT_USER_INFO.dateOfBirth,
    });
    const [passwordFormData, setPasswordFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    useEffect(() => {
        refetchUser();
        setUserInfoFormData({
            firstName: user?.first_name || DEFAULT_USER_INFO.firstName,
            lastName: user?.last_name || DEFAULT_USER_INFO.lastName,
            email: user?.email || DEFAULT_USER_INFO.email,
            username: user?.username || DEFAULT_USER_INFO.username,
            phonenumber: user?.phone_number || DEFAULT_USER_INFO.phonenumber,
            dateOfBirth: user?.date_of_birth || DEFAULT_USER_INFO.dateOfBirth,
        });
    }, [userInfoUpdated, user])

    const mutationUserInfo = useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            console.log('User info updated successfully');
            setUserInfoUpdated(true);
        },
    })

    const mutationUserPassword = useMutation({
        mutationFn: updateUserPassword,
        onSuccess: () => {
            console.log('User password updated successfully');
        }
    })

    const handleSaveUserInfo = async (e) => {
        e.preventDefault();
        console.log('Saving user info');
        mutationUserInfo.mutate({ userId: user?.id, formData: userInfoFormData });
    }

    const handleSavePasswordForm = async (e) => {
        e.preventDefault();
        console.log('Changing password info');
        if (passwordFormData.new_password !== passwordFormData.confirm_password) {
            // TODO: show error message 
            console.error('Passwords do not match');
            return;
        }
        mutationUserPassword.mutate({ userId: user?.id, passwordFormData: passwordFormData });
    }

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

    const handleChangeUserInfoForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserInfoFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePasswordForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPasswordFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!user) return <p>Loading User details...</p>;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 min-h-screen">
            {/* Static sidebar for desktop */}
            <UserSidebar />

            <div className="xl:col-span-3">
                <div>
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
                                    {userInfoFields.map((field) => (
                                        <div key={field.name} className="sm:col-span-3">
                                            <label htmlFor={field.name} className="block text-sm font-medium leading-6 ">
                                                {field.label}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    id={field.name}
                                                    autoComplete={field.autoComplete}
                                                    value={userInfoFormData[field.name as keyof typeof userInfoFormData]}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onChange={handleChangeUserInfoForm}
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                                                onChange={handleChangePasswordForm}
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
                                                onChange={handleChangePasswordForm}
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
                                                onChange={handleChangePasswordForm}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        onClick={(event) => handleSavePasswordForm(event)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
