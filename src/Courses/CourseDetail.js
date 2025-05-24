import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Account/api';
import '../components/styles/Container.css';
import { useAuth } from '../Account/AuthUser';

export default function CourseDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5); // рейтинг по умолчанию
    const [submitError, setSubmitError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get(`/api/courses/${id}`);
                setCourse(res.data);
            } catch (err) {
                setError('Course not found or error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setSubmitError('Комментарий не может быть пустым');
            return;
        }
        if (!user) {
            setSubmitError('Вы должны быть авторизованы, чтобы оставить комментарий');
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const newReview = {
                username: user.username,
                comment,
                rating,
                createdAt: new Date().toISOString(),
                id: Date.now(), // временный id для локального обновления
            };
            await api.post(`/api/courses/${id}/reviews`, {
                comment,
                rating,
            });

            setCourse((prev) => ({
                ...prev,
                reviews: prev.reviews ? [...prev.reviews, newReview] : [newReview],
            }));

            setComment('');
            setRating(5);
        } catch (err) {
            setSubmitError('Ошибка при отправке комментария');
        } finally {
            setSubmitting(false);
        }
    };

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p>{error}</p>;
    if (!course) return <p>Course not found</p>;

    return (
        <>
            <div className="containerforall">
                <h2>{course.title}</h2>
                <img
                    src={course.image}
                    alt={course.title}
                    style={{ width: '300px', marginBottom: '15px' }}
                />
                <p>{course.description}</p>
                <p>Category: {course.category}</p>
                <p>Price: ${course.price}</p>
            </div>

            <div className="containerforall" style={{ marginTop: '30px' }}>
                <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                    <h4>Оставить комментарий</h4>
                    {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            Рейтинг:{' '}
                            <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                disabled={submitting}
                                required
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={submitting}
                            required
                            rows={4}
                            placeholder="Ваш комментарий..."
                            style={{ width: '400px', maxWidth: '100%' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || !user}
                        style={{ marginTop: '10px' }}
                    >
                        {submitting ? 'Отправка...' : 'Отправить'}
                    </button>
                    {!user && (
                        <p style={{ color: 'red', marginTop: '10px' }}>
                            Войдите, чтобы оставить комментарий
                        </p>
                    )}
                </form>

                <div className="reviews-section">
                    <h3>Отзывы</h3>
                    {course.reviews && course.reviews.length > 0 ? (
                        [...course.reviews]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((review) => (
                                <div key={review.id} className="review">
                                    <strong className="review-username">{review.username || 'User'}</strong>
                                    <p className="review-comment">{review.comment}</p>
                                    <div className="review-footer">
                                        <div className="review-rating">Рейтинг: {review.rating} ⭐</div>
                                        <div className="review-date">
                                            {review.createdAt ? formatDate(review.createdAt) : ''}
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>Комментариев пока нет.</p>
                    )}

                </div>
            </div>
        </>
    );
}
