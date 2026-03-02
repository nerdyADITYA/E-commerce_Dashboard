/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { storage } from '../services/storage';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const session = storage.get('session');
        if (session) {
            const now = new Date().getTime();
            if (now < session.expiry) {
                return session.user;
            }
            storage.remove('session'); // Expired
        }
        return null;
    });
    const [loading] = useState(false);

    const login = (email, password) => {
        const users = storage.get('users', []);
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            // Create session valid for 5 minutes
            const expiry = new Date().getTime() + 5 * 60 * 1000;
            const sessionData = { user: foundUser, expiry };
            storage.set('session', sessionData);
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (name, email, password) => {
        const users = storage.get('users', []);
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        const newUser = { name, email, password };
        users.push(newUser);
        storage.set('users', users);
        return { success: true };
    };

    const updateProfile = (updates) => {
        if (!user) return { success: false };
        const users = storage.get('users', []);
        const updatedUsers = users.map(u => u.email === user.email ? { ...u, ...updates } : u);
        storage.set('users', updatedUsers);

        // Update session and user state
        const currentUserInfo = { ...user, ...updates };
        setUser(currentUserInfo);
        const session = storage.get('session');
        if (session) {
            storage.set('session', { ...session, user: currentUserInfo });
        }
        return { success: true };
    };

    const logout = () => {
        storage.remove('session');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
