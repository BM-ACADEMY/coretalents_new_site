import { createContext, useContext } from 'react';

// { admin, status: 'loading' | 'in' | 'out', signIn, signOut } - provided by AdminApp
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
