import React from 'react';
import { Link } from 'react-router-dom';
import "../../src/components/weather.css";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h2 className='weather-container'>404 - Strony nie znaleziono</h2>
      <p>Przepraszamy, strona, której szukasz, nie istnieje.</p>
      <Link to="/">Wróć na stronę główną</Link>
    </div>
  );
};

export default NotFoundPage;