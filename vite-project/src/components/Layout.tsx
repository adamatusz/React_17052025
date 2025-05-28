import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../../src/components/weather.css";

const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Strona Główna</Link>
          </li>
          <li>
            <Link to="/about">O nas</Link>
          </li>
          <li>
            <Link to="/notfound">Nieistniejąca Strona (test)</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <main>
        {/* Tutaj będą renderowane komponenty poszczególnych ścieżek */}
        <Outlet />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Moja Aplikacja</p>
      </footer>
    </div>
  );
};

export default Layout;