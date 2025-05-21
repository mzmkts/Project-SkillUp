import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Account/api';  // твой настроенный axios или fetch-wrapper
import '../components/styles/Container.css';

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get(`/api/courses/${id}`);
                console.log(res.data);
                setCourse(res.data);

            } catch (err) {
                setError('Course not found or error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p>{error}</p>;
    if (!course) return <p>Course not found</p>;

    return (
        <div className="containerforall">
            <h2>{course.title}</h2>
            <img src={course.image} alt={course.title} style={{ width: '300px', marginBottom: '15px' }} />
            <p>{course.description}</p>
            <p>Category: {course.category}</p>
            <p>Price: ${course.price}</p>
        </div>
    );
}
