import { useState } from "react";
import axios from 'axios';
import FilterSection from "../Components/Transaction/Transaction.FilterSection.tsx";
import TransactionList from "../Components/Transaction/Transaction.TransactionList.tsx";
import TransactionModal from "../Components/Transaction/Transaction.TransactionModal.tsx";
import Sidebar from "../Components/Dashboard/Dashboard.sideBar.tsx";

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
  const [isEditData, setIsEditData] = useState<transactionDataType | null>(null);

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
      });
      setRefreshTransactions(!refreshTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    handleCloseModal();
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: "url('data:image/jpeg;base64,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')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Transaction Tracker</h1>
        <FilterSection
          onNewTransaction={handleNewTransaction}
          onSearchChange={setSearchParams}
        />
        <TransactionList
          key={refreshTransactions ? 1 : 0}
          searchParams={searchParams}
          setIsEditData={setIsEditData}
          handleNewTransaction={handleNewTransaction}
        />
        
        <TransactionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddTransaction}
          editData={isEditData}
          setIsEditData={setIsEditData}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
