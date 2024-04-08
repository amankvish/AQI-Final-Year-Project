import React from "react";
import Navbar from "./screens/Navbar";
import Footer from "./screens/Footer";
import WeatherApp from "./screens/WeatherApp";

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?weather')",
      }}
    >
      <Navbar />
      <WeatherApp />
      <Footer />
    </div>
  );
};

export default App;
