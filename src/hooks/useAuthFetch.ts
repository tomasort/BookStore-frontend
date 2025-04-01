// import { useUser } from '../context/UserContext';
// import authFetch from '../api/authFetch';

// export const useAuthFetch = () => {
//     const { setUserId } = useUser();

//     const fetchWithAuth = async (url: string, options = {}) => {
//         try {
//             const response = await authFetch(url, options);
//             return response;
//         } catch (error: any) {
//             if (error.message === 'Unauthorized') {
//                 setUserId(null); // Clear the userId on 401 error
//             }
//             throw error;
//         }
//     };

//     return fetchWithAuth;
// };
