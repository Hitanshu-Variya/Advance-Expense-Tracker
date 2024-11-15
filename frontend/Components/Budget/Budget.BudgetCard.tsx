import React, { useState } from 'react';
import axios from 'axios';
import { Budget } from '../../Interfaces/Interfaces';

interface BudgetCardProps {
  budget: Budget;
  onUpdate: () => void;
}

const BudgetCard = ({ budget, onUpdate }: BudgetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState<Budget>({
    ...budget,
    period: budget.period || 'month', 
    amount: budget.amount || 0, 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedBudget({
      ...updatedBudget,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/budget/update-budget/${budget._id}`, updatedBudget, {
        withCredentials: true,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {!isEditing ? (
        <>
          <h3 className="text-xl font-semibold">{budget.category}</h3>
          <p>Current Budget for {budget.period}: ${budget.amount}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              Set Budget
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="mb-2">
            <input
              type="number"
              name="amount"
              value={updatedBudget.amount}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
              placeholder="Enter Amount"
            />
          </div>
          <div className="mb-2">
            <select
              name="period"
              value={updatedBudget.period}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
