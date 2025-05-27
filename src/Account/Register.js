import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../components/styles/Register.css';

export default function Register() {
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword || !email) {
            setError(t('register.All fields are required'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('Passwords do not match'));
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || t('Registration failed'));
                setSuccessMessage('');
                return;
            }

            setSuccessMessage(t('register.Registration successful! Please log in.'));
            setError('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');

        } catch (err) {
            setError(t('register.Network error. Please try again later.'));
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <h2>{t('register.Register')}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">{t('register.Username')}</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">{t('register.Password')}</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">{t('register.Confirm Password')}</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">{t('register.Email')}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                <button type="submit">{t('register.RegisterButton')}</button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    {t('register.Already have an account?')} <Link to="/login">{t('register.Go to Login')}</Link>
                </div>
            </form>
        </div>
    );
}
