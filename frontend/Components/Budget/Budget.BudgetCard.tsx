import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Budget } from '../../Interfaces/Interfaces'; // Assuming Budget interface is defined here
import { Doughnut, Bar, Pie, PolarArea, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components
ChartJS.register(
  ArcElement, Tooltip, Legend, Title, // Donut, Pie, and Polar charts
  BarElement, CategoryScale, LinearScale, // Bar chart
);

interface BudgetCardProps {
  budget: Budget;
  onUpdate: () => void;
  chartType: string; // Receive chart type as a prop
}

const BudgetCard = ({ budget, onUpdate, chartType }: BudgetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState<Budget>({
    ...budget,
    period: budget.period || 'month',
    amount: budget.amount || 0,
  });

  const [incomeAmount, setIncomeAmount] = useState(0); // Total income for this budget category
  const [expenseAmount, setExpenseAmount] = useState(0); // Total expense for this budget category

  // Fetch transactions related to the budget category
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/data/get-by-category/${budget.category}`,
          {
            withCredentials: true,
          }
        );
        const { totalIncome, totalExpense } = response.data;
        setIncomeAmount(totalIncome);
        setExpenseAmount(totalExpense);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [budget.category]); // Re-fetch when the category changes

  // Prepare data for charts
  const chartData = {
    labels: ['Expense', 'Remaining Budget'],
    datasets: [
      {
        data: [expenseAmount, updatedBudget.amount - expenseAmount], // Expense vs Remaining budget
        backgroundColor: ['#FF5733', '#D3D3D3'], // Red for Expense, Light Gray for Remaining Budget
        hoverOffset: 4,
      },
    ],
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true, // Make the chart responsive
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `$${tooltipItem.raw.toFixed(2)}`; // Format the tooltip label
          },
        },
      },
      legend: {
        position: 'bottom' as const, // Position of the legend
        labels: {
          boxWidth: 12, // Smaller legend items
          fontSize: 14, // Adjust legend font size
        },
      },
    },
    cutout: '0%', // Ensure no cutout (if you want a full pie chart)
  };

  // Donut chart options (for doughnut charts)
  const doughnutChartOptions = {
    responsive: true, // Make the chart responsive
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `$${tooltipItem.raw.toFixed(2)}`; // Format the tooltip label
          },
        },
      },
      legend: {
        position: 'bottom' as const, // Position of the legend
        labels: {
          boxWidth: 12, // Smaller legend items
          fontSize: 14, // Adjust legend font size
        },
      },
    },
    cutout: '70%', // Donut chart effect
  };

  // Render the selected chart type
  const renderChart = () => {
    const commonProps = { data: chartData };

    switch (chartType) {
      case 'doughnut':
        return <Doughnut {...commonProps} options={doughnutChartOptions} />;
      case 'bar':
        return <Bar {...commonProps} />;
      case 'pie':
        return <Pie {...commonProps} options={pieChartOptions} />; // Use pieChartOptions for Pie chart
      default:
        return <Doughnut {...commonProps} options={doughnutChartOptions} />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedBudget({
      ...updatedBudget,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/budget/update-budget/${budget._id}`,
        updatedBudget,
        {
          withCredentials: true,
        }
      );
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold">{budget.category}</h3>

      {/* Display the selected chart type (same type for all graphs) */}
      <div className="mb-4">
        {renderChart()}
      </div>

      {!isEditing ? (
        <>
          <p>Current Budget for {budget.period}: ${updatedBudget.amount}</p>
          <p>Expense so far: ${expenseAmount}</p>
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
