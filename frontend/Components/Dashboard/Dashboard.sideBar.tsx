import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaFileInvoiceDollar, FaUser } from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState('');
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile/get-profile`, {
        withCredentials: true,
      });
      setUsername(response.data.name);
    };

    fetchUsername();
  }, []);

  const handleMouseEnter = (text: string) => {
    setTooltip(text);
  };

  const handleMouseLeave = () => {
    setTooltip('');
  };

  const handlelogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`);
      if(response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside className="w-20 md:w-24 lg:w-auto bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] text-gray-800 shadow-lg h-screen rounded-l-xl">
      <div className="flex flex-col justify-between h-screen p-4">
        <div className="flex items-center justify-center mb-2">
          <img className="w-16 xl:w-16" src="../Utilities/Images/Logo.png" alt="ExpenFlow logo" />
          <h1 className="text-base md:text-lg xl:text-xl font-semibold text-blue-800">Expense Flow</h1>
        </div>

        <hr className="border-t border-blue-200 mx-4 mb-4" />
        <nav>
          <ul className="space-y-2 pl-4">
            {[
              { name: "Home", icon: <FaHome />, path: "/dashboard" },
              { name: "Transactions", icon: <FaWallet />, path: "/transactions" },
              { name: "Budget", icon: <FaFileInvoiceDollar />, path: "/budget" },
              { name: "Profile", icon: <FaUser />, path: "/profile" },
            ].map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full flex items-center justify-start p-3 pl-5 rounded-lg transition-all duration-200 hover:bg-blue-200 hover:text-blue-900"
                >
                  <span className="text-2xl text-blue-600 mr-4">
                    {item.icon}
                  </span>
                  <span className="text-base text-blue-800">{item.name}</span>
                  {/* Tooltip will be visible only on medium screens and larger */}
                  {tooltip === item.name && (
                    <div className="absolute left-[80px] top-1/2 transform -translate-y-1/2 bg-blue-800 text-white text-xs rounded-md py-1 px-2 shadow-md block md:hidden">
                      {item.name}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center mt-12">
          <div className="flex flex-col items-center mb-10">
            <img
              className="w-20 h-20 rounded-full mb-3"
              src="../Utilities/Images/account.jpg"
              alt="User avatar"
            />
            <span className="text-2xl font-medium text-blue-900">{username ? username : "User"}</span>
            <span className="text-sm font-light text-blue-700">Welcome!</span>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="text-center w-auto px-6 py-3 rounded-lg text-base transition-all"
              onClick={handlelogout}
            >
              <div className="flex items-center space-x-3 text-lg font-semibold text-blue-800 cursor-pointer hover:text-blue-600">
                <TbLogout2 className="text-2xl" />
                <span>Log out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
