import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import '../components/styles/Container.css';
import '../components/styles/Settings.css';
import { useAuth } from '../Account/AuthUser';
import api from '../Account/api';

export default function Settings() {
    const { t } = useTranslation();
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
            setAvatarPreview(user.avatarUrl || '');
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await api.put(`/api/users/update/${formData.id}`, {
                username: formData.username,
                age: formData.age,
                gender: formData.gender,
                password: formData.password
            });

            if (avatarFile) {
                const avatarData = new FormData();
                avatarData.append('avatar', avatarFile);
                const avatarRes = await api.post(
                    `/api/users/uploadAvatar/${formData.id}`,
                    avatarData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                if (avatarRes.data.avatarUrl) {
                    setUser({ ...user, avatarUrl: avatarRes.data.avatarUrl });
                    setAvatarPreview(avatarRes.data.avatarUrl);
                }
            }

            setMessage(t('settings.success'));
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || t('settings.error'));
        }
    };

    return (
        <div className="containerforall">
            <Helmet>
                <title>{t('settings.title')} — SkillUp</title>
                <meta name="description" content={t('settings.metaDescription')} />
            </Helmet>
            <h2>{t('settings.title')}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="avatar">{t('settings.avatar')}</label><br />
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt={t('settings.avatarAlt')}
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
                        />
                    )}
                    <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>

                <div>
                    <label htmlFor="username">{t('settings.username')}</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="age">{t('settings.age')}</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="gender">{t('settings.gender')}</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{t('settings.genderSelect')}</option>
                        <option value="male">{t('settings.male')}</option>
                        <option value="female">{t('settings.female')}</option>
                        <option value="other">{t('settings.other')}</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="password">{t('settings.password')}</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">{t('settings.save')}</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
