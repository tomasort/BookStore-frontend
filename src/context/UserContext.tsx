import { createContext, Dispatch, SetStateAction } from 'react';
import { useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import getUserId from '@/getUserId';
import getUser from '@/api/getUser';
import { useQuery } from '@tanstack/react-query';

interface UserContextType {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>,
    userId: string | null,
    setUserId: Dispatch<SetStateAction<string | null>>,
    refetchUser: () => void,
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    userId: null,
    setUserId: () => { },
    refetchUser: () => { },
});

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
