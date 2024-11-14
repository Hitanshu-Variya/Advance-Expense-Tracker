import React, { useState } from 'react';
import axios from 'axios';

interface Transaction {
  _id: string;
  transactionName: string;
  amount: number;
  category: string;
  paymentMethod: string;
  description?: string;
  date: string;
  transactionType: string; 
}

const TransactionCard = ({ transaction, onEdit }: { transaction: Transaction, onEdit: () => void }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/data/update-transaction/${transaction._id}`, updatedTransaction, {
        withCredentials: true,
      });
      setIsEditing(false); 
      onEdit();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/data/delete-transaction/${transaction._id}`, {
        withCredentials: true,
      });
      onEdit();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {!isEditing ? (
        <>
          <h3 className="text-xl font-semibold">{transaction.transactionName}</h3>
          <p>Type: {transaction.transactionType}</p>
          <p>Category: {transaction.category}</p>
          <p>Amount: ${transaction.amount}</p>
          <p>Date: {formattedDate}</p>
          <div className="flex gap-2">
            <button onClick={handleEditClick} className="text-blue-500">Edit</button>
            <button onClick={handleDelete} className="text-red-500">Delete</button>
          </div>
        </>
      ) : (
        <div>
          <input
            type="text"
            name="transactionName"
            value={updatedTransaction.transactionName}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="number"
            name="amount"
            value={updatedTransaction.amount}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="category"
            value={updatedTransaction.category}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="paymentMethod"
            value={updatedTransaction.paymentMethod}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <textarea
            name="description"
            value={updatedTransaction.description || ''}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <input
            type="date"
            name="date"
            value={updatedTransaction.date}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          />
          <select
            name="transactionType"
            value={updatedTransaction.transactionType}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
