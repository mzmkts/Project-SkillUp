import { useAuth } from './AuthUser'; // Хук для использования информации о пользователе
import { useNavigate } from 'react-router-dom';
import '../components/styles/Logout.css';

export default function Logout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (user) {
            logout();
            navigate('/login');
        } else {
            navigate('/Profile');
        }
    };

    return (
        <div className="logout-container">
            <h1 className="logout-title">Are you sure you want to log out?</h1>
            <button className="logout-button" onClick={handleLogout}>Yes, log me out</button>
        </div>
    );
}
