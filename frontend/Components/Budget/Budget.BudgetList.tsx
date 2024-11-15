import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetCard from '../Budget/Budget.BudgetCard.tsx';
import { Budget } from '../../Interfaces/Interfaces'; // Assuming Budget interface is defined here

const BudgetList = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [chartType, setChartType] = useState('doughnut'); // Single chart type for all cards

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/budget/get-budgets`, {
          withCredentials: true,
        });
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };

  return (
    <div>
      {/* Dropdown to select graph type (affects all cards) */}
      <div className="mb-4">
        <select
          onChange={handleChartTypeChange}
          value={chartType}
          className="border p-2 rounded"
        >
          <option value="doughnut">Donut Graph</option>
          <option value="bar">Bar Graph</option>
          <option value="pie">Pie Graph</option>
        </select>
      </div>

      {/* Render Budget Cards */}
      {budgets.map((budget) => (
        <BudgetCard
          key={budget._id}
          budget={budget}
          onUpdate={() => console.log('Budget updated')}
          chartType={chartType} // Pass the selected chart type to each card
        />
      ))}
    </div>
  );
};

export default BudgetList;
