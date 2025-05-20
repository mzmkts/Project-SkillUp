import React from 'react';
import Navbar from './components/Navigation.js'; // твой кастомный navbar без antd
import RoutesContent from './Routes.tsx'; // убедись, что ты не указываешь .tsx в импорте

const App = () => {
    return (
        <div>
            <Navbar />
            <main style={{ padding: '20px' }}>
                <RoutesContent />
            </main>
        </div>
    );
};

export default App;
