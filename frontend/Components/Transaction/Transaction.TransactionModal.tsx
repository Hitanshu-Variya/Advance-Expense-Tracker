import React, { useState } from "react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transactionData: {
    transactionName: string;
    amount: number;
    category: string;
    description?: string;
    paymentMethod: string;
    date: string;
    transactionType: string;
  }) => void;
}

const initialTransactionData = {
  transactionName: "",
  amount: 0,
  category: "Food",
  description: "",
  paymentMethod: "cash",
  date: new Date().toISOString().slice(0, 10),
  transactionType: "",
};

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [transactionData, setTransactionData] = useState(initialTransactionData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(transactionData);
    setTransactionData(initialTransactionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Transaction</h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Transaction Name</label>
            <input
              type="text"
              name="transactionName"
              value={transactionData.transactionName}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Groceries"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={transactionData.amount}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="0"
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Transaction Type</label>
            <select
              name="transactionType"
              value={transactionData.transactionType}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Category</label>
            <select
              name="category"
              value={transactionData.category}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Description</label>
            <textarea
              name="description"
              value={transactionData.description}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add a description (optional)"
              rows={3}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Payment Method</label>
            <select
              name="paymentMethod"
              value={transactionData.paymentMethod}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={transactionData.date}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
