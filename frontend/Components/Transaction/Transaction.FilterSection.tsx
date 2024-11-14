import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import TransactionModal from "./Transaction.TransactionModal.tsx";
import axios from "axios";

interface FilterSectionProps {
  onNewTransaction: () => void; 
}

const FilterSection: React.FC<FilterSectionProps> = ({ onNewTransaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleNewTransaction = async (transactionData: {
    transactionName: string;
    amount: number;
    category: string;
    description?: string;
    paymentMethod: string;
    date: string;
  }) => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/data/add-transaction`, {...transactionData}, {
        withCredentials: true
      });
      onNewTransaction();  
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error adding new transaction:", error);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center bg-white shadow rounded-md p-2 w-full max-w-md">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search transactions"
          className="w-full outline-none"
        />
      </div>
      <select className="bg-white shadow rounded-md p-2 text-gray-600">
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Utilities">Utilities</option>
        <option value="Others">Others</option>
      </select>
      <button
          className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)} 
        >
        <FaPlus /> Add Transaction
      </button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleNewTransaction} 
      />
    </div>
  );
};

export default FilterSection;
