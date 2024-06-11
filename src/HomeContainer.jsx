import React from "react";
import { Outlet, Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Progress</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/contact">Programs</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default HomeContainer;
