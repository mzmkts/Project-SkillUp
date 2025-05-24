import React, { useEffect, useState } from "react";
import '../components/styles/Container.css';
import { useAuth } from "../Account/AuthUser";
import api from '../Account/api';
import '../components/styles/Settings.css';

export default function Settings() {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        id: '',
        username: '',
        age: '',
        gender: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                username: user.username || '',
                age: user.age || '',
                gender: user.gender || '',
                password: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            console.log('Отправляем данные:', formData);
            const res = await api.put(`/api/users/update/${formData.id}`, {
                username: formData.username,
                age: formData.age,
                gender: formData.gender,
                password: formData.password,
            });
            console.log('Ответ сервера:', res);
            setMessage('Данные успешно сохранены');
        } catch (err) {
            console.error('Ошибка при обновлении:', err.response || err);
            setError(err.response?.data?.error || 'Ошибка на сервере');
        }
    };


    return (
        <div className="containerforall">
            <h2>Настройки</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Возраст:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Пол:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Выбери пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                        <option value="other">Другое</option>
                    </select>
                </div>
                <div>
                    <label>Новый пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Сохранить изменения</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
