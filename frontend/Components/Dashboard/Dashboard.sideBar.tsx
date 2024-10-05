import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaChartPie, FaFileInvoiceDollar, FaCog, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState('');

  const handleMouseEnter = (text:string) => {
    setTooltip(text);
  };

  const handleMouseLeave = () => {
    setTooltip('');
  };

  return (
    <aside className="w-24 md:w-52 lg:w-56 xl:w-64 bg-gradient-to-b from-[#2A0A4B] to-[#46287c] text-gray-300 shadow-lg fixed top-2 left-1 h-[97.8vh] z-50 rounded-2xl">
      <div className="p-6 px-4">
        <div className='flex flex-col justify-center items-center mb-6'>
          <img className='w-14 xl:w-16 md:mr-2' src="../Utilities/Images/Logo.png" alt="ExpenFlow logo"/>
          <h1 className="hidden md:block md:text-xl xl:text-2xl text-center font-bold text-white">Expense Flow</h1>
        </div>
        <hr className='mb-4 bg-slate-500 h-[1px] lg:h-[2px] border-none' />
        <nav>
          <ul className="space-y-3">
            {[
              { name: "Home", icon: <FaHome />, path: "/dashboard" },
              { name: "Expenses", icon: <FaWallet />, path: "/expenses" },
              { name: "Budget", icon: <FaFileInvoiceDollar />, path: "/budget" },
              { name: "Report", icon: <FaChartPie />, path: "/report" },
              { name: "Settings", icon: <FaCog />, path: "/settings" },
              { name: "Profile", icon: <FaUser />, path: "/profile" },
            ].map((item) => (
              <li key={item.name}>
                <button 
                  onClick={() => navigate(item.path)} 
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full flex items-center text-left p-3 rounded-lg transition-all duration-200 hover:bg-[#2a2a65] hover:shadow-[0px_0px_8px_#c78de0]"
                >
                  <span className="bg-[#5C4A8D] text-white rounded-full p-3 mr-4 text-xl">
                    {item.icon}
                  </span>
                  <span className="text-lg hidden md:block">{item.name}</span>
                  {tooltip === item.name && (
                    <div className="block md:hidden absolute left-[70px] top-1/2 transform -translate-y-1/2 bg-slate-700 text-white text-sm rounded-md py-1 px-2 shadow-lg">
                      {item.name}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
