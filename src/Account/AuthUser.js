import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const res = await api.get('/api/auth/me');
            console.log('Auth check success:', res.data);
            setUser(res.data);
        } catch (err) {
            console.log('Auth check failed:', err);
            logout();
        } finally {
            setLoading(false);
        }
    };



    const register = async (userData) => {
        try {
            const res = await api.post('/api/auth/register', userData);
            const { user, token } = res.data;

            localStorage.setItem('token', token);
            setUser(user);

            navigate('/profile');
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const login = async (credentials) => {
        console.log('Sending login data:', credentials);
        try {
            const res = await api.post('/api/auth/login', credentials);
            const { user, token } = res.data;

            localStorage.setItem('token', token);
            setUser(user);

            navigate('/profile');
            return { success: true };
        } catch (error) {
            console.log('Login error response:', error.response);
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed',
            };
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const isAdmin = () => user?.role === 'admin';

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
