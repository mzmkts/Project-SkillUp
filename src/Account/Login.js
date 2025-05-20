import { useState } from 'react';
import { useAuth } from './AuthUser';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styles/Login.css';

export default function Login() {
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
            setError('Network error: ' + err.message);
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit">Login</button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    Don't have an account? <Link to="/register">Go to Register</Link>
                </div>
            </form>
        </div>
    );
}
