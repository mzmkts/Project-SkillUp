import { useState } from 'react';
import { useAuth } from './AuthUser';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../components/styles/Login.css';

export default function Login() {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login({ username, password });

            if (!result.success) {
                setError(result.error);
                return;
            }

            navigate('/profile');
        } catch (err) {
            setError(t('networkError', { message: err.message }));
        }
    };

    return (
        <div className="login-container">
            <h2>{t('login.title')}</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>{t('login.username')}:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>{t('login.password')}:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{t('login.loginButton')}</button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    {t('login.noAccount')} <Link to="/register">{t('login.goToRegister')}</Link>
                </div>
            </form>
        </div>
    );
}
