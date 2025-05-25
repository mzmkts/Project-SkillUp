import React, {useEffect, useState} from 'react';
import {useAuth} from '../Account/AuthUser';
import '../components/styles/Profile.css';

export default function Profile() {
    const { user } = useAuth();

    if (!user) return <div className="profile-container">Not logged in</div>;

    const avatarUrl = user.avatar
        ? `http://localhost:5000${user.avatar.startsWith('/uploads/') ? user.avatar : `/uploads/${user.avatar}`}`
        : '/default-avatar.png';

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="profile-avatar"
                    style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
                />
                <h2>Hi, {user.username}!</h2>
            </div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'User'}</p>
            {user.age !== undefined && <p><strong>Age:</strong> {user.age}</p>}
            {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
        </div>
    );
}

