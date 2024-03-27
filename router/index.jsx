import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/main";
import WeatherPage from "../src/pages/weather";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
