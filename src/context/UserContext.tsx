import logout from '@/api/logout';
import getUser from '@/api/getUser';
import login from '@/api/login';
import updateUserPassword from "@/api/updateUserPassword";
import updateUserInfo from "@/api/updateUserInfo";
import { createContext, Dispatch, SetStateAction } from 'react';
import { useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import getUserId from '@/getUserId';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    userId: string | null;
    setUserId: Dispatch<SetStateAction<string | null>>;
    isLoading: boolean;
    error: string;
    login: (data: any) => void;
    logout: () => void;
    updateUser: (data: any) => void;
    updatePassword: (data: any) => void;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: any }) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(() => getUserId());
    const [error, setError] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedUserId = getUserId();
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData, userId])

    const userInfoMutation = useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            console.log('User info updated successfully');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    })

    const userPasswordMutation = useMutation({
        mutationFn: updateUserPassword,
        onSuccess: () => {
            console.log('User password updated successfully');
        }
    })

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data: any) => {
            sessionStorage.setItem('userId', data.user_id);
            setUserId(data.user_id);
            window.location.href = '/user-dashboard';
        },
        onError: (error: any) => {
            setError(error.message);
        }
    })

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            sessionStorage.removeItem('userId');
            window.location.href = '/login';
        }
    })

    const userContextValue: UserContextType = {
        user: user,
        setUser: setUser,
        userId: userId,
        setUserId: setUserId,
        error: error,
        isLoading: isLoading,
        login: loginMutation.mutate,
        updateUser: userInfoMutation.mutate,
        updatePassword: userPasswordMutation.mutate,
        logout: logoutMutation.mutate,
        isAuthenticated: !!userId && !!user,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
