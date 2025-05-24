import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Navbar.css';
import { useAuth } from '../Account/AuthUser';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex align-items-center justify-content-between custom-nav px-2">
            <ul className="nav nav-tabs mb-0">
                <li className="nav-item">
                    <NavLink to="/Profile" className="nav-link">
                        Профиль
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Courses" className="nav-link">
                        Курсы
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/AboutUs" className="nav-link">
                        О нас
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Settings" className="nav-link">
                        Настройки
                    </NavLink>
                </li>

                {isAdmin() && (
                    <li className="nav-item">
                        <NavLink to="/Dashboard" className="nav-link">
                            Dashboard
                        </NavLink>
                    </li>
                )}
            </ul>

            <ul className="nav mb-0">
                {!user ? (
                    <>
                        <li className="nav-item">
                            <NavLink to="/Login" className="nav-link text-light">
                                Войти
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Register" className="nav-link text-light">
                                Регистрация
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
                            Выйти
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
