import React from 'react';
import { useAuth } from '../Account/AuthUser';
import { useTranslation } from 'react-i18next';
import '../components/styles/Profile.css';

export default function Profile() {
    const { user } = useAuth();
    const { t } = useTranslation();

    if (!user) {
        return <div className="profile-container">{t('profile.notLoggedIn')}</div>;
    }

    const SERVER_URL = 'http://localhost:5000';
    const avatarSrc = user.avatar ? SERVER_URL + user.avatar : '/default-avatar.png';

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="profile-avatar"
                    style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
                />
                <h2>{t('profile.greeting')}, {user.username}!</h2>
            </div>
            <p><strong>{t('profile.email')}:</strong> {user.email}</p>
            <p><strong>{t('profile.role')}:</strong> {user.role || t('profile.user')}</p>
            {user.age !== undefined && <p><strong>{t('profile.age')}:</strong> {user.age}</p>}
            {user.gender !== undefined && <p><strong>{t('profile.gender')}:</strong> {t(`profile.${user.gender}`)}</p>}
        </div>
    );
}