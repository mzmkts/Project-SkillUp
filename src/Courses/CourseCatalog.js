import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../components/styles/CourseCatalog.css';
import '../components/styles/Container.css';
import api from '../Account/api';

const CourseCatalog = () => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6, total: 0 });
    const [filters, setFilters] = useState({ category: '', search: '', sort: 'newest' });
    const [enrollMessage, setEnrollMessage] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: pagination.current,
                limit: pagination.pageSize,
                category: filters.category || undefined,
                search: filters.search || undefined,
                sort: filters.sort || undefined,
            };
            Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

            const res = await api.get('/api/courses', { params });
            setCourses(res.data.courses);
            setPagination((prev) => ({ ...prev, total: Number(res.data.total) }));
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (err) {
            setError(t('catalog.error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [pagination.current, filters]);

    const handleEnroll = async (courseId) => {
        if (enrolledCourses.includes(courseId)) {
            setEnrollMessage({ type: 'error', text: t('catalog.alreadyEnrolled') || 'You are already enrolled.' });
            return;
        }

        try {
            setEnrollMessage(null);
            await api.post(`/api/courses/${courseId}/enroll`);
            setEnrollMessage({ type: 'success', text: t('catalog.enrollSuccess') || 'Enrolled successfully!' });
            setEnrolledCourses((prev) => [...prev, courseId]);
        } catch (err) {
            // НЕ console.error(err);
            const message = err.response?.data?.message || t('catalog.enrollError') || 'Failed to enroll.';
            setEnrollMessage({ type: 'error', text: message });
            // НЕ выбрасываем ошибку дальше (не throw), чтобы axios не логировал её в консоль
        }
    };


    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStar && '☆'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    return (
        <div className="containerforall">
            <div className="course-catalog">
                <div className="catalog-header">
                    <h2>{t('catalog.title')}</h2>
                    <div className="catalog-controls">
                        <input
                            type="text"
                            placeholder={t('catalog.searchPlaceholder')}
                            value={filters.search}
                            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && setPagination((p) => ({ ...p, current: 1 }))}
                        />
                        <select
                            value={filters.category}
                            onChange={(e) => {
                                setFilters((f) => ({ ...f, category: e.target.value }));
                                setPagination((p) => ({ ...p, current: 1 }));
                            }}
                        >
                            <option value="">{t('catalog.allCategories')}</option>
                            <option value="programming">{t('catalog.programming')}</option>
                            <option value="design">{t('catalog.design')}</option>
                            <option value="business">{t('catalog.business')}</option>
                            <option value="language">{t('catalog.language')}</option>
                        </select>
                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                        >
                            <option value="newest">{t('catalog.newest')}</option>
                            <option value="alphabetical">{t('catalog.alphabetical')}</option>
                        </select>
                        <button
                            onClick={() => {
                                setPagination((p) => ({ ...p, current: 1 }));
                                fetchCourses();
                            }}
                        >
                            {t('catalog.refresh')}
                        </button>
                    </div>
                </div>

                {enrollMessage && (
                    <div className={`enroll-message ${enrollMessage.type}`}>
                        {enrollMessage.text}
                    </div>
                )}

                {error && <div className="error-box">{error}</div>}

                {loading ? (
                    <div className="loading">{t('catalog.loading')}</div>
                ) : (
                    <>
                        <div className="courses-grid">
                            {courses.map((c) => (
                                <div key={c.id} className="course-card">
                                    <img src={c.image} alt={c.title} />
                                    <h3>{c.title}</h3>
                                    <p>{c.description.slice(0, 80)}...</p>
                                    <div className="rating">
                                        {t('catalog.rating')}:
                                        {c.averageRating ? (
                                            <>
                                                {renderStars(c.averageRating)} ({c.averageRating.toFixed(1)})
                                            </>
                                        ) : (
                                            t('catalog.noRatings')
                                        )}
                                    </div>
                                    <div className="card-footer">
                                        <span>{c.category}</span>
                                        <span>${c.price}</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn" onClick={() => handleEnroll(c.id)}>
                                            {t('catalog.enroll')}
                                        </button>
                                        <Link to={`/Courses/${c.id}`} className="btn">
                                            {t('catalog.details')}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination-controls">
                            <button
                                disabled={pagination.current === 1}
                                onClick={() => setPagination((p) => ({ ...p, current: p.current - 1 }))}
                            >
                                {t('catalog.previous')}
                            </button>
                            <span>
                                {t('catalog.page', { page: pagination.current, total: totalPages || 1 })}
                            </span>
                            <button
                                disabled={pagination.current === totalPages || totalPages === 0}
                                onClick={() => setPagination((p) => ({ ...p, current: p.current + 1 }))}
                            >
                                {t('catalog.next')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseCatalog;
