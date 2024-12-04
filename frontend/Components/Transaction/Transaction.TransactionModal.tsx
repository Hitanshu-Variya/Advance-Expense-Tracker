import axios from "axios";
import React, { useState, useEffect } from "react";

interface TransactionData {
  _id?: string;
  amount: number;
  category: string;
  date: string;
  transactionName: string,
  description: string,
  paymentMethod: string,
  transactionType: string
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionData) => void;
  editData?: TransactionData[] | null;
  setIsEditData: (data: TransactionData[] | null) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  setIsEditData
}) => {
  const [formData, setFormData] = useState<TransactionData>({
    transactionName: '',
    amount: 0,
    category: 'Food',
    description: '',
    paymentMethod: 'cash',
    date: new Date().toISOString().split('T')[0],
    transactionType: 'expense'
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        transactionName: editData[0]?.transactionName,
        amount: editData[0]?.amount,
        category: editData[0]?.category,
        description: editData[0]?.description || '',
        paymentMethod: editData[0]?.paymentMethod,
        date: editData[0]?.date,
        transactionType: editData[0]?.transactionType
      });
    }
  }, [editData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateTransaction = async () => {
    try {
      if(!editData) return;

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/data/update-transaction/${editData[0]?._id}`, formData, {
        withCredentials: true,
      });

      if(response.status === 200){
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating transaction:", error); 
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(editData){
      handleUpdateTransaction();
      setIsEditData(null);
    } else {
      onSubmit(formData);
      setFormData({
        transactionName: '',
        amount: 0,
        category: 'Food',
        description: '',
        paymentMethod: 'cash',
        date: new Date().toISOString().split('T')[0],
        transactionType: 'expense'
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{editData ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600">Transaction Name</label>
            <input
              type="text"
              name="transactionName"
              value={formData.transactionName}
              onChange={handleInputChange}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Groceries"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Amount (&#8377;)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
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
              value={formData.transactionType}
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
              value={formData.category}
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
              value={formData.description}
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
              value={formData.paymentMethod}
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
              value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
              onChange={(e) => {
                if (e.target.value) {
                  const date = new Date(e.target.value);
                  const formattedDate = date.toISOString().split('T')[0];
                  setFormData({ ...formData, date: formattedDate });
                }
              }}
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
              {editData ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
