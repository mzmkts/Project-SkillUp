import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../Account/api';
import '../components/styles/Container.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    // Управление состояниями редактирования/создания
    const [editingUser, setEditingUser] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [creatingCourse, setCreatingCourse] = useState(false);

    // Форма пользователя
    const [userForm, setUserForm] = useState({
        username: '',
        age: '',
        gender: '',
        role: 'user',
        password: '',
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);

    // Форма курса
    const [courseForm, setCourseForm] = useState({
        title: '',
        description: '',
        image: '',
        category: 'other',
        price: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchCourses();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/api/users');
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await api.get('/api/courses?page=1&limit=100');
            setCourses(res.data.courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    const handleUserDelete = async (id) => {
        try {
            await api.delete(`/api/users/${id}`);
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const handleCourseDelete = async (id) => {
        try {
            await api.delete(`/api/courses/${id}`);
            setCourses(courses.filter((c) => c.id !== id));
        } catch (err) {
            console.error('Error deleting course:', err);
        }
    };

    // --- Редактирование пользователя ---
    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setEditingCourse(null);
        setCreatingCourse(false);
        setMessage('');
        setError('');
        setUserForm({
            username: user.username || '',
            age: user.age || '',
            gender: user.gender || '',
            role: user.role || 'user',
            password: '',
        });
        setAvatarPreview(user.avatar || '');
        setAvatarFile(null);
    };

    const handleUserFormChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const { username, age, gender, password, role } = userForm;
            await api.put(`/api/users/admin/update/${editingUser.id}`, {
                username,
                age,
                gender,
                password,
                role,
            });

            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                await api.post(`/api/users/uploadAvatar/${editingUser.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            await fetchUsers();
            setEditingUser(null);
            setMessage('Пользователь обновлён');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Ошибка обновления');
        }
    };

    // --- Создание курса ---
    const handleCreateCourseClick = () => {
        setCreatingCourse(true);
        setEditingUser(null);
        setEditingCourse(null);
        setMessage('');
        setError('');
        setCourseForm({
            title: '',
            description: '',
            image: '',
            category: 'other',
            price: '',
        });
    };

    const handleCourseFormChange = (e) => {
        setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
    };

    const handleCreateCourseSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await api.post('/api/courses', courseForm);
            await fetchCourses();
            setCreatingCourse(false);
            setMessage('Курс добавлен!');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Ошибка добавления курса');
        }
    };

    // --- Редактирование курса ---
    const handleEditCourseClick = (course) => {
        setEditingCourse(course);
        setEditingUser(null);
        setCreatingCourse(false);
        setMessage('');
        setError('');
        setCourseForm({
            title: course.title || '',
            description: course.description || '',
            image: course.image || '',
            category: course.category || 'other',
            price: course.price || '',
        });
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await api.put(`/api/courses/${editingCourse.id}`, courseForm);
            await fetchCourses();
            setEditingCourse(null);
            setMessage('Курс обновлён!');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Ошибка обновления курса');
        }
    };

    // --- Общие функции ---
    const handleCancel = () => {
        setEditingUser(null);
        setEditingCourse(null);
        setCreatingCourse(false);
        setMessage('');
        setError('');
    };

    return (
        <div className="containerforall">
            <h1>Admin Dashboard</h1>

            {/* Пользователи */}
            <section>
                <h2>Users</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button onClick={() => handleEditUserClick(u)}>Edit</button>
                                <button onClick={() => handleUserDelete(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Курсы */}
            <section>
                <h2>Courses</h2>
                <button onClick={handleCreateCourseClick}>Создать курс</button>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td>{c.category}</td>
                            <td>{c.price}</td>
                            <td>
                                <button onClick={() => handleEditCourseClick(c)}>Edit</button>
                                <button onClick={() => handleCourseDelete(c.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/* Контейнер для редактирования пользователя или создания/редактирования курса */}
            {(editingUser || creatingCourse || editingCourse) && (
                <section style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
                    {/* Редактирование пользователя */}
                    {editingUser && (
                        <>
                            <h2>Редактирование пользователя: {editingUser.username}</h2>
                            <form onSubmit={handleUpdateUser}>
                                {avatarPreview && (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                )}
                                <input type="file" accept="image/*" onChange={handleAvatarChange} />

                                <div>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={userForm.username}
                                        onChange={handleUserFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Age:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={userForm.age}
                                        onChange={handleUserFormChange}
                                    />
                                </div>
                                <div>
                                    <label>Gender:</label>
                                    <select
                                        name="gender"
                                        value={userForm.gender}
                                        onChange={handleUserFormChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Мужской</option>
                                        <option value="female">Женский</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Role:</label>
                                    <select name="role" value={userForm.role} onChange={handleUserFormChange}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Password (оставьте пустым, чтобы не менять):</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userForm.password}
                                        onChange={handleUserFormChange}
                                    />
                                </div>
                                <button type="submit">Сохранить</button>
                                <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                                    Отмена
                                </button>
                            </form>
                        </>
                    )}

                    {/* Создание курса */}
                    {creatingCourse && (
                        <>
                            <h2>Создание курса</h2>
                            <form onSubmit={handleCreateCourseSubmit}>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={courseForm.title}
                                        onChange={handleCourseFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        name="description"
                                        value={courseForm.description}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <div>
                                    <label>Image URL:</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={courseForm.image}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <div>
                                    <label>Category:</label>
                                    <select
                                        name="category"
                                        value={courseForm.category}
                                        onChange={handleCourseFormChange}
                                    >
                                        <option value="programming">Programming</option>
                                        <option value="design">Design</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={courseForm.price}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <button type="submit">Создать</button>
                                <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                                    Отмена
                                </button>
                            </form>
                        </>
                    )}

                    {/* Редактирование курса */}
                    {editingCourse && (
                        <>
                            <h2>Редактирование курса: {editingCourse.title}</h2>
                            <form onSubmit={handleUpdateCourse}>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={courseForm.title}
                                        onChange={handleCourseFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        name="description"
                                        value={courseForm.description}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <div>
                                    <label>Image URL:</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={courseForm.image}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <div>
                                    <label>Category:</label>
                                    <select
                                        name="category"
                                        value={courseForm.category}
                                        onChange={handleCourseFormChange}
                                    >
                                        <option value="programming">Programming</option>
                                        <option value="design">Design</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={courseForm.price}
                                        onChange={handleCourseFormChange}
                                    />
                                </div>
                                <button type="submit">Сохранить</button>
                                <button type="button" onClick={handleCancel} style={{ marginLeft: 10 }}>
                                    Отмена
                                </button>
                            </form>
                        </>
                    )}

                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            )}

            <Outlet />
        </div>
    );
}
