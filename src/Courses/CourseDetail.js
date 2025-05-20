import { useParams } from 'react-router-dom';
import courses from '../Courses/CourseData';
import '../components/styles/Container.css'

export default function CourseDetails() {
    const { id } = useParams();
    const courseId = Number(id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return <p>Course not found</p>;
    }

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
