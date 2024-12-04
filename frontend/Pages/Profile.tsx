import { useState, useEffect } from 'react';
import profilePic from "/Images/profile_side.png";
import axios from 'axios';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Dashboard/Dashboard.sideBar';

interface UserProfile {
  username: string;
  password: string;
  email: string;
  contactNumber: string;
  gender: string;
  language: string;
  dateOfBirth: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfile>({
    username: "John",
    password: "",
    email: "john@example.com",
    contactNumber: "1234567890",
    gender: "male",
    language: "English",
    dateOfBirth: "1990-01-01"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile/get-profile`, {
          withCredentials: true
        });

        setUserData({
          username: response.data.name,
          password: "",
          email: response.data.email,
          contactNumber: response.data.contactNumber,
          gender: response.data.gender,
          language: response.data.language,
          dateOfBirth: response.data.dateOfBirth.toLocaleString()
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/profile/update-profile`,
        {
          username: userData.username,
          password: userData.password,
          contactNumber: userData.contactNumber,
          gender: userData.gender,
          language: userData.language,
          dateOfBirth: userData.dateOfBirth
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB').split('/').join('-');
  };

  return (
    <div className="min-h-screen bg-slate-500 text-gray-200">
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex-1 bg-slate-500 p-5 font-sans flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('data:image/jpeg;base64,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')" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="relative w-96 h-96 flex-shrink-0"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 40,
                duration: 1
              }}
            >
              <div className="absolute bg-[#c8ecf3] top-0 left-0 w-full h-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 rounded-lg overflow-hidden">
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              className="relative bg-[#c8ecf3] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 shadow-lg p-6 rounded-lg flex flex-col md:flex-row flex-1 w-full"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 40,
                duration: 1
              }}
            >
              {/* Left Section */}
              <div className="flex-2 pr-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Personal Details</h2>
                  {isEditing ? (
                    <div className="space-x-2">
                      <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                        Save
                      </button>
                      <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                      Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium">User Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring-blue-300 focus:outline-none"
                      />
                    ) : (
                      <p className="mt-1 p-2 w-48 bg-slate-500 bg-opacity-70 rounded-md">{userData.username}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Change Password</label>
                  {isEditing ? (
                    <input
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring-blue-300 focus:outline-none"
                      placeholder="New Password"
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-slate-500 bg-opacity-70 rounded-md">••••••••</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <p className="mt-1 p-2 bg-slate-500 bg-opacity-70 rounded-md">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Contact Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.contactNumber}
                      onChange={(e) => setUserData({ ...userData, contactNumber: e.target.value })}
                      className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring-blue-300 focus:outline-none"
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-slate-500 bg-opacity-70 rounded-md">{userData.contactNumber}</p>
                  )}
                </div>
              </div>

              <div className="border-l border-gray-300 mx-6"></div>

              <div className="flex-1 pl-6">
                <h2 className="text-lg font-semibold mb-4">Other Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Gender</label>
                  {isEditing ? (
                    <select
                      value={userData.gender}
                      onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                      className="mt-1 p-2 w-48 border bg-slate-800 rounded-md focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="mt-1 p-2 w-48 bg-slate-500 bg-opacity-70 rounded-md">{userData.gender}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Language</label>
                  {isEditing ? (
                    <select
                      value={userData.language}
                      onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                      className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring-blue-300 focus:outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Korean">Korean</option>
                    </select>
                  ) : (
                    <p className="mt-1 p-2 bg-slate-500 bg-opacity-70 rounded-md">{userData.language}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={new Date(userData.dateOfBirth).toISOString().split('T')[0]}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formattedDate = date.toISOString().split('T')[0];
                        setUserData({ ...userData, dateOfBirth: formattedDate });
                      }}
                      className="mt-1 p-2 w-full bg-slate-800 border rounded-md focus:ring-blue-300 focus:outline-none"
                    />
                  ) : (
                    <p className="mt-1 p-2 bg-slate-500 bg-opacity-70 rounded-md">
                      {formatDate(userData.dateOfBirth)}
                    </p>
                  )}
                </div>
              </div>

              <motion.button
                className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Dashboard
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;