import { createContext, Dispatch, SetStateAction } from 'react';
import { useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import getUserId from '@/getUserId';
import getUser from '@/api/getUser';
import { useQuery } from '@tanstack/react-query';

type UserContextType = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    userId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: any }) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(() => getUserId());
    useEffect(() => {
        const storedUserId = getUserId(); // Ensure this function reads from localStorage
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    const { data: userData, isFetched, refetch: refetchUser } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser({ userId }),
        enabled: !!userId,
    });
    useEffect(() => {
        if (userData && isFetched) {
            setUser(userData);
        }
    }, [userData, userId])

    return (
        <UserContext.Provider value={{ user, setUser, userId, setUserId, refetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// }
