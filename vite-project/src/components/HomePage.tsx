import React from "react";
import "../../src/components/weather.css"; // Import stylów CSS dla komponentu

const HomePage: React.FC = () => {
	return (
		<div>
			<h2 className='weather-container'>Strona Główna</h2>
			<p>Witaj na stronie głównej!</p>
		</div>
	);
};

export default HomePage;
