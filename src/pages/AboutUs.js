import React from 'react';
import '../components/styles/AboutUs.css';

export default function AboutUs() {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to our platform! We are passionate about providing high-quality educational content and interactive courses 
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
        </div>
    );
}
