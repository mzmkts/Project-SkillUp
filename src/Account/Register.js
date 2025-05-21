import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/Register.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword || !email) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
                setError(data.error || 'Registration failed');
                setSuccessMessage('');
                return;
            }

            // Если регистрация успешна
            setSuccessMessage('Registration successful! Please log in.');
            setError('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');

        } catch (err) {
            setError('Network error. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
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
                <button type="submit">Register</button>
                
                {/* Добавленный блок с ссылкой на логин */}
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    Already have an account? <Link to="/login">Go to Login</Link>
                </div>
            </form>
        </div>
    );
}