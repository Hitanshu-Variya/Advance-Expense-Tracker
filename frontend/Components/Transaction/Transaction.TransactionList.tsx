import React, { useEffect, useState } from "react";
import axios from "axios";
import incomeImage from "../../Utilities/Images/income.png";
import expenseImage from "../../Utilities/Images/expense.png";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 

interface TransactionData {
  _id?: string;
  amount: number;
  category: string;
  date: string;
  transactionName: string,
  description?: string,
  paymentMethod: string,
  transactionType: string
}

interface TransactionListProps {
  searchParams: { attribute: string; value: string };
  setIsEditData: (value: TransactionData[] | null) => void;
  handleNewTransaction: () => void;
}

// Helper function to format date into DD-MM-YYYY
const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const TransactionList: React.FC<TransactionListProps> = ({
  searchParams,
  setIsEditData,
  handleNewTransaction
}) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/data/get-transactions/${id}`,
        {
          withCredentials: true,
        }
      );

      setIsEditData(response.data);
      handleNewTransaction();
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/data/get-all-transactions`,
        {
          withCredentials: true,
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    searchParams.attribute
      ? transaction[searchParams.attribute as keyof TransactionData]
          ?.toString()
          .toLowerCase()
          .includes(searchParams.value.toLowerCase())
      : true
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/data/delete-transaction/${id}`, { withCredentials: true });
      if(response.status === 200){
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="space-y-4">
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between rounded-lg shadow-lg p-4 h-full w-full bg-[#c8ecf3] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 "
          >
            {/* Left Section - Icon, Name and Category/Date */}
            <div className="flex items-center space-x-4">
              {/* Transaction Type Icon */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  transaction.transactionType === "income"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                <img
                  src={
                    transaction.transactionType === "income"
                      ? incomeImage
                      : expenseImage
                  }
                  alt={transaction.transactionType}
                  className="w-8 h-8"
                />
              </div>

              {/* Transaction Name and Category */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-200">
                  {transaction.transactionName}
                </h3>
                <p className="text-sm text-gray-400">
                  {transaction.category}, {formatDate(transaction.date)}
                </p>
              </div>
            </div>

            {/* Right Section - Amount and Edit/Delete Buttons */}
            <div className="flex items-center space-x-6">
              <div className="font-bold text-xl text-gray-200">
                ${transaction.amount.toFixed(2)}
              </div>

              {/* Edit & Delete Buttons */}
              <div className="flex space-x-2">
                <button
                  // @ts-ignore
                  onClick={() => handleEdit(transaction._id)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  // @ts-ignore
                  onClick={() => handleDelete(transaction._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
