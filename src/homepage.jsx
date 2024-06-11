//This is gonna be the homepage

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>Click the button below to open a new workout!</p>
      <Link to="/editworkout">
        <button>Open workout</button>
      </Link>
    </div>
  );
};

export default HomePage;
