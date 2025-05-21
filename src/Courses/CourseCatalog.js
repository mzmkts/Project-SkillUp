import React, {useState, useEffect} from 'react';
import '../components/styles/CourseCatalog.css';
import '../components/styles/Container.css';
import {Link} from 'react-router-dom';
import api from '../Account/api';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({current: 1, pageSize: 8, total: 0});
    const [filters, setFilters] = useState({category: '', search: '', sort: 'newest'});

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            // Формируем query параметры для API
            const params = {
                page: pagination.current,
                limit: pagination.pageSize,
                category: filters.category || undefined,
                search: filters.search || undefined,
                sort: filters.sort || undefined,
            };

            // Удаляем undefined параметры (чтобы не передавать лишнее)
            Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

            const res = await api.get('/api/courses', {params});

            setCourses(res.data.courses);
            setPagination(prev => ({ ...prev, total: res.data.total }));


        } catch (e) {
            setError('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [pagination.current, filters]);

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    return (
        <div className="containerforall">
            <div className="course-catalog">
                <div className="catalog-header">
                    <h2>Available Courses</h2>
                    <div className="catalog-controls">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={filters.search}
                            onChange={e => setFilters(f => ({...f, search: e.target.value}))}
                            onKeyDown={e => e.key === 'Enter' && setPagination(p => ({...p, current: 1}))}
                        />
                        <select
                            value={filters.category}
                            onChange={e => {
                                setFilters(f => ({...f, category: e.target.value}));
                                setPagination(p => ({...p, current: 1}));
                            }}
                        >
                            <option value="">All Categories</option>
                            <option value="programming">Programming</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                            <option value="language">Language</option>
                        </select>
                        <select
                            value={filters.sort}
                            onChange={e => setFilters(f => ({...f, sort: e.target.value}))}
                        >
                            <option value="newest">Newest First</option>
                            <option value="alphabetical">A-Z</option>
                        </select>
                        <button
                            onClick={() => {
                                setPagination(p => ({...p, current: 1}));
                                fetchCourses();
                            }}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {error && <div className="error-box">{error}</div>}
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <div className="courses-grid">
                            {courses.map(c => (
                                <div key={c.id} className="course-card">
                                    <img src={c.image} alt={c.title}/>
                                    <h3>{c.title}</h3>
                                    <p>{c.description.slice(0, 80)}...</p>
                                    <div className="card-footer">
                                        <span>{c.category}</span>
                                        <span>${c.price}</span>
                                    </div>
                                    <div className="card-actions">
                                        <a href="#" className="btn">Enroll</a>
                                        <Link to={`/Courses/${c.id}`} className="btn">Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                {Array.from({length: totalPages}, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={pagination.current === i + 1 ? 'active' : ''}
                                        onClick={() => setPagination(p => ({...p, current: i + 1}))}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseCatalog;
