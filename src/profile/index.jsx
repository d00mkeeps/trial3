// index.jsx
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";


const UserProfileComponent = () => {
  const { userProfile, isLoading, error } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile ? (
        <div>
          <p>
            Name: {userProfile.first_name} {userProfile.last_name}
          </p>
          <p>Username: {userProfile.username}</p>
          <p>Password: {userProfile.password}</p>
          <p>Email: {userProfile.email}</p>
          <p>Date of Birth: {userProfile.date_of_birth}</p>
          <p>Height: {userProfile.height} cm</p>
          <p>Weight: {userProfile.weight} kg</p>
          <p>Created: {userProfile.created_at}</p>
          {/* Display other user profile fields */}
          <Link to="/profile/edit">Edit Profile</Link>
        </div>
      ) : (
        <div>No user profile data found.</div>
      )}
    </div>
  );
};

export default UserProfileComponent;
