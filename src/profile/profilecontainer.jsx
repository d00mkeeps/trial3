import React from "react";
import { Outlet, Link } from "react-router-dom";

const ProfileContainer = () => {
  return (
    <div>
      <h1>Profile</h1>
      <nav>
        <ul>
          <li>
            <Link to="/profile/edit">Edit</Link>
          </li>
          <li>
            <Link to="/profile/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileContainer;
