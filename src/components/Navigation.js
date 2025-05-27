import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Navbar.css';
import { useAuth } from '../Account/AuthUser';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className="d-flex align-items-center justify-content-between custom-nav px-2">
            <ul className="nav nav-tabs mb-0">
                <li className="nav-item">
                    <NavLink to="/Profile" className="nav-link">
                        {t('nav.profile')}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Courses" className="nav-link">
                        {t('nav.courses')}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/AboutUs" className="nav-link">
                        {t('nav.about')}
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Settings" className="nav-link">
                        {t('nav.settings')}
                    </NavLink>
                </li>

                {isAdmin() && (
                    <li className="nav-item">
                        <NavLink to="/Dashboard" className="nav-link">
                            {t('nav.dashboard')}
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className="d-flex align-items-center gap-3">
                <select className="form-select form-select-sm" value={i18n.language} onChange={handleLanguageChange}>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>

                <ul className="nav mb-0">
                    {!user ? (
                        <>
                            <li className="nav-item">
                                <NavLink to="/Login" className="nav-link text-light">
                                    {t('nav.login')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Register" className="nav-link text-light">
                                    {t('nav.register')}
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
                                {t('nav.logout')}
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
