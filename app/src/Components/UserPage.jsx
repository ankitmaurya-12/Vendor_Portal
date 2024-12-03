import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from the backend API
    axios.get('/api/user').then(response => {
      setUser(response.data);
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        {user ? (
          <form className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/4 font-bold">Profile Picture:</label>
              <input
                type="file"
                className="border p-2 w-3/4"
                placeholder={user.profilePic}
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">First Name:</label>
              <input
                type="text"
                value={user.fname}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Last Name:</label>
              <input
                type="text"
                value={user.lname}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Company:</label>
              <input
                type="text"
                value={user.company}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Description:</label>
              <textarea
                value={user.description}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Address:</label>
              <input
                type="text"
                value={user.address}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Email:</label>
              <input
                type="email"
                value={user.email}
                className="border p-2 w-3/4"
              />
            </div>
            <div className="flex">
              <label className="w-1/4 font-bold">Change Password:</label>
              <input
                type="password"
                className="border p-2 w-3/4"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </form>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
