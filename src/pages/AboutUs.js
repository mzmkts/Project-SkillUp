import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTranslation } from 'react-i18next';
import '../components/styles/AboutUs.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibXpta3RzIiwiYSI6ImNtYjN3NWJkeTA4czUya3F1Y2g5dGplbDkifQ.BnAjdIOAQTPtc9nZ-rwM9Q';

export default function AboutUs() {
    const mapContainer = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [76.87127635425507, 43.21448792513457],
            zoom: 14,
        });

        new mapboxgl.Marker()
            .setLngLat([76.87127635425507, 43.21448792513457])
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
        <div className="about-container">
            <h1>{t('about.title')}</h1>
            <p>{t('about.welcome')}</p>
            <p>{t('about.mission')}</p>

            <div className="about-section">
                <h2>{t('about.whyChooseUs')}</h2>
                <ul>
                    {t('about.benefits', { returnObjects: true }).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="about-section">
                <h2>{t('about.contact')}</h2>
                <p>{t('about.email')}</p>
                <p>{t('about.instagram')}</p>
            </div>

            <div
                ref={mapContainer}
                style={{
                    height: '400px',
                    width: '100%',
                    marginTop: '20px',
                    borderRadius: '10px',
                }}
            />
        </div>
    );
}
