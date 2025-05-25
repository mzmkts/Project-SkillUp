import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import '../components/styles/AboutUs.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibXpta3RzIiwiYSI6ImNtYjN3NWJkeTA4czUya3F1Y2g5dGplbDkifQ.BnAjdIOAQTPtc9nZ-rwM9Q';


export default function AboutUs() {
    const mapContainer = useRef(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [76.87127635425507, 43.21448792513457], // lng, lat
            zoom: 14,
        });

        new mapboxgl.Marker()
            .setLngLat([76.87127635425507, 43.21448792513457])
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to our platform! We are passionate about providing high-quality educational content and
                interactive courses
                for everyone interested in web development, design, and technology.
            </p>
            <p>
                Our mission is to make learning simple and accessible for all — from beginners to advanced learners.
                We offer a variety of courses, english, programming courses, such as Python, Java, C++ courses and etc.
            </p>
            <div className="about-section">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>📚 Expert-led courses</li>
                    <li>⚡ Interactive learning with real projects</li>
                    <li>🎯 Personalized dashboard to track your progress</li>
                    <li>🌐 Community of passionate learners</li>
                </ul>
            </div>
            <div className="about-section">
                <h2>Contact</h2>
                <p>Email: support@skillup.kz</p>
                <p>Instagram: @skill-up</p>
            </div>

            <div
                ref={mapContainer}
                style={{height: '400px', width: '100%', marginTop: '20px', borderRadius: '10px'}}
            />
        </div>
    );
}
