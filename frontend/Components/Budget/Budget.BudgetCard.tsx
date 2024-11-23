import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Budget } from '../../Interfaces/Interfaces'; // Assuming Budget interface is defined here
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
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
        backgroundColor: ['#FF5733', '#5ddfdb'], // Red for Expense, Light Gray for Remaining Budget
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

  const handleUpdate = async (budgetId: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/budget/update-budget/${budgetId}`,
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
    <div
      className="bg-[#c8ecf3] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 p-6 rounded shadow-lg relative"
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Category Name */}
      <h3 className="text-3xl font-semibold text-gray-200 mb-4">{budget.category}</h3>

      {/* Display the selected chart type (same type for all graphs) */}
      <div className="mb-4" style={{ maxWidth: '300px', margin: '0px auto 80px auto', height: '250px', display: 'flex', justifyContent: 'center' }}>
  {renderChart()}
</div>

      {/* Budget Details */}
      <div className="absolute bottom-4 left-4">
        <p className="text-sm text-gray-200">
          Total Budget for {updatedBudget.period}: <strong>${updatedBudget.amount}</strong>
        </p>
        <p className="text-sm text-gray-200">
          Total Expenses so far: <strong>${expenseAmount}</strong>
        </p>
      </div>

      {/* Editing Mode */}
      {isEditing && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-[#c8ecf3] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 shadow-lg max-w-md w-full mx-4 md:mx-8 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">Set Budget</h3>
            <div className="mb-4">
              <input
                type="number"
                name="amount"
                value={updatedBudget.amount}
                onChange={handleInputChange}
                className="border p-2 rounded w-full mb-2 bg-transparent text-white placeholder-gray-300"
                placeholder="Enter Amount"
              />
            </div>
            <div className="mb-4">
              <select
                name="period"
                value={updatedBudget.period}
                onChange={handleInputChange}
                className="border p-2 rounded w-full bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week" className="bg-[#2d3748] text-white hover:bg-blue-600">Week</option>
                <option value="month" className="bg-[#2d3748] text-white hover:bg-blue-600">Month</option>
                <option value="year" className="bg-[#2d3748] text-white hover:bg-blue-600">Year</option>
              </select>
            </div>
            <div className="flex justify-between gap-2">
              <button 
                onClick={() => handleUpdate(budget._id)} 
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-1 px-4 rounded-full"
          >
            Set Budget
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
