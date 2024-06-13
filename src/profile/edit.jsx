// EditProfile.jsx
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { updateUserProfile } from "../supabaseClient";

const EditProfile = () => {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await updateUserProfile(formData);
      setUserProfile(updatedProfile);
      // Optionally, navigate back to the profile page after successful update
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            step="0.01"
            value={formData.height || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            step="0.01"
            value={formData.weight || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Use Imperial Units:
          <input
            type="checkbox"
            name="is_imperial"
            checked={formData.is_imperial || false}
            onChange={(e) =>
              setFormData({ ...formData, is_imperial: e.target.checked })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;