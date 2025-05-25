import React from 'react';
import {useAuth} from '../Account/AuthUser';
import '../components/styles/Profile.css';

export default function Profile() {
    const {user} = useAuth();

    if (!user) {
        return <div className="profile-container">Not logged in</div>;
    }

    const SERVER_URL = 'http://localhost:5000';
    const avatarSrc = user.avatar ? SERVER_URL + user.avatar : '/default-avatar.png';
    console.log('User:', user);
    console.log('Avatar URL:', avatarSrc);


    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="profile-avatar"
                    style={{width: 150, height: 150, borderRadius: '50%', objectFit: 'cover'}}
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
