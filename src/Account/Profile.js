import React from 'react';
import { useAuth } from './AuthUser';
import '../components/styles/Profile.css';

export default function Profile() {
    const { user } = useAuth();

    if (!user) {
        return <div className="profile-container">Not logged in</div>;
    }

    return (
        <div className="profile-container">
            <h2>Hi, {user.username}!</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'User'}</p>
            {user.age !== undefined && <p><strong>Age:</strong> {user.age}</p>}
            {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
        </div>

    );
}
