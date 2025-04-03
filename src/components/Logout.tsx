import { useUser } from '../context/UserContext';

export default function Logout() {
    const { logout } = useUser();

    const handleLogout = async () => {
        logout();
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
