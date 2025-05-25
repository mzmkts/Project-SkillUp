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

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
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
            setAvatarPreview(user.avatarUrl || ''); // если в user есть ссылка на аватар
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчик выбора файла аватара
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file)); // показываем превью
        }
    };

    // Отправка обновленных данных и аватара
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // 1) Обновляем профиль (без аватара)
            const res = await api.put(`/api/users/update/${formData.id}`, {
                username: formData.username,
                age: formData.age,
                gender: formData.gender,
                password: formData.password,
            });
            console.log('Ответ сервера (обновление):', res);

            // 2) Если выбран файл аватара — отправляем его
            if (avatarFile) {
                const avatarData = new FormData();
                avatarData.append('avatar', avatarFile);

                const avatarRes = await api.post(
                    `/api/users/uploadAvatar/${formData.id}`,
                    avatarData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                console.log('Ответ сервера (аватар):', avatarRes);

                // Обновим аватар в локальном user, если нужно
                if (avatarRes.data.avatarUrl) {
                    setUser({ ...user, avatarUrl: avatarRes.data.avatarUrl });
                    setAvatarPreview(avatarRes.data.avatarUrl);
                }
            }

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

                {/* Аватарка с превью */}
                <div>
                    <label>Аватар:</label><br />
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt="Avatar preview"
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>

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
