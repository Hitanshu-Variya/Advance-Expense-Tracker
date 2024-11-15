import React, { useState } from "react";
import axios from 'axios';
import FilterSection from "../Components/Transaction/Transaction.FilterSection.tsx";
import TransactionList from "../Components/Transaction/Transaction.TransactionList.tsx";
import TransactionModal from "../Components/Transaction/Transaction.TransactionModal.tsx"; 

type transactionDataType = {
  transactionName: string;
  amount: number;
  category: string;
  description?: string;
  paymentMethod: string;
  date: string;
  transactionType: string;
};

const TransactionPage = () => {
  const [refreshTransactions, setRefreshTransactions] = useState(false);
  const [searchParams, setSearchParams] = useState({ attribute: "", value: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleNewTransaction = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTransaction = async (transactionData: transactionDataType) => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/data/add-transaction`, transactionData, {
          withCredentials: true,
        }
      );
      setRefreshTransactions(!refreshTransactions); 
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    handleCloseModal(); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transaction Tracker</h1>
      <FilterSection
        onNewTransaction={handleNewTransaction}
        onSearchChange={setSearchParams}
      />
      <TransactionList
        key={refreshTransactions ? 1 : 0}  
        onNewTransaction={handleNewTransaction}
        searchParams={searchParams} 
      />
      
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default TransactionPage;
