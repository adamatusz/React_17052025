 import React from "react";
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Weather from "./components/weather";

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import RegistrationForm from "./components/registrationForm/RegistrationForm";
// import "./App.css";
// import "../src/components/weather.css";

function App() {
	return (
		<>
			<div>
				<h1>Moja aplikacja pogodowa</h1>
				<Weather />
			</div>
			<div>
				<h1>Rejestracja klienta</h1>
				<RegistrationForm />
			</div>
			 <BrowserRouter>
      <Routes>
        {/* Trasa z Layoutem, która obejmuje inne pod-trasy */}
        <Route path="/" element={<Layout />}>
          {/* index={true} oznacza, że ten komponent będzie renderowany dla ścieżki nadrzędnej ("/") */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegistrationForm />} /> {/* Dodana trasa do formularza */}

          {/* Obsługa nieistniejących tras (404) - musi być na końcu */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
		</>
		
	);
}

export default App;
