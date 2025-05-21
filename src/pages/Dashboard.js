import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import api from '../Account/api';
import '../components/styles/Container.css';
export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchCourses();
    }, []);

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const res = await api.get('/api/users');
            console.log(res.data);
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchCourses = async () => {
        try {
            console.log('Fetching courses...');
            const res = await api.get('/api/courses?page=1&limit=100'); // оставляем
            console.log(res.data);
            setCourses(res.data.courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    const handleUserDelete = async (id) => {
        try {
            await api.delete(`/api/users/${id}`);        // ← и здесь
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const handleCourseDelete = async (id) => {
        try {
            await api.delete(`/api/courses/${id}`);      // ← и здесь
            setCourses(courses.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error deleting course:', err);
        }
    };

    return (
        <div className="containerforall">
            <h1>Admin Dashboard</h1>
            <section>
                <h2>Users</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>
                                <button onClick={() => navigate(`/dashboard/users/${u.id}/edit`)}>Edit</button>
                                <button onClick={() => handleUserDelete(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Courses</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.price}</td>
                            <td>
                                <button onClick={() => navigate(`/dashboard/courses/${c.id}/edit`)}>Edit</button>
                                <button onClick={() => handleCourseDelete(c.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
            <Outlet />
        </div>
    );
}
