import React from 'react';
import Navbar from './screens/Navbar';
import Footer from './screens/Footer';
import WeatherApp from './screens/WeatherApp';

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <WeatherApp />
            <Footer />
        </div>
    );
};

export default App;
