import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="d-flex align-items-center justify-content-between custom-nav px-2">
            <ul className="nav nav-tabs mb-0">
                <li className="nav-item">
                    <NavLink to="/Profile" className="nav-link" activeClassName="active">
                        Профиль
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Courses" className="nav-link" activeClassName="active">
                        Курсы
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/AboutUs" className="nav-link" activeClassName="active">
                        О нас
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Settings" className="nav-link" activeClassName="active">
                        Настройки
                    </NavLink>
                </li>

            </ul>

            <ul className="nav mb-0">
                <li className="nav-item">
                    <a className="nav-link text-light" href="/Login">
                        Войти
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/Register">
                        Регистрация
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
