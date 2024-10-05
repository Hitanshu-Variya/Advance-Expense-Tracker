import { FaUserCircle } from 'react-icons/fa';
import { HeaderProps } from '../../Interfaces/Interfaces.ts';

const Header: React.FC<HeaderProps> = ({ name, page }) => {
  return (
    <div className='py-2 pl-3 pr-2 ml-24 md:ml-52 lg:ml-56 xl:ml-64'>
      <div className="flex justify-between items-center bg-[#2A0A4B] text-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold">{page}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold pr-2">Hi, {name}</span>
          <button className="bg-[#5C4A8D] rounded-full p-2 transition-all duration-200 hover:bg-[#4E2B91]">
            <FaUserCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
