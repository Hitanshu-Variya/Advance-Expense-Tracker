import { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetCard from '../Components/Budget/Budget.BudgetCard.tsx'; // Ensure correct import path
import { categories, Category } from '../Interfaces/Interfaces';
import { Budget } from '../Interfaces/Interfaces';
import Sidebar from '../Components/Dashboard/Dashboard.sideBar.tsx'; // Assuming you have a Sidebar component

const BudgetSection = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState('doughnut'); // Default chart type

  // Fetch budgets data from the server
  const fetchBudgets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/budget/get-budgets`, {
        withCredentials: true,
      });
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleUpdateBudget = () => {
    fetchBudgets();
  };

  // Map over categories to associate them with the respective budgets
  const categoriesWithBudgets = categories.map((category: Category) => {
    const budget = budgets.find((b) => b.category === category);
    return budget
      ? budget
      : {
        category,
        amount: 0,
        period: 'week' as 'week',
        _id: null
      };
  });

  const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };
  
  return (
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="sticky top-0 h-screen w-64 bg-gray-800 text-white">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 rounded-lg shadow-lg"
    style={{
      backgroundImage: "url('data:image/jpeg;base64,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')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="flex justify-between items-center mb-10">
  {/* Budget Allocation Text */}
  <h2 className="text-3xl font-semibold text-gray-200">Budget Allocation</h2>

  <div className="flex items-center">
    <span className="mr-2 text-gray-200">Chart Type : </span> {/* Label for the dropdown */}
    <select
      onChange={handleChartTypeChange}
      value={chartType}
      className="bg-blue-500 text-white rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-600 transition-all ease-in-out"
    >
      <option value="doughnut">Donut Graph</option>
      <option value="bar">Bar Graph</option>
      <option value="pie">Pie Graph</option>
    </select>
  </div>
</div>


    {/* Show loading message or render budget cards */}
    {isLoading ? (
      <p className="text-gray-300">Loading budgets...</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesWithBudgets.length > 0 ? (
          categoriesWithBudgets.map((budget, index) => (
            <BudgetCard
              key={index}
              budget={budget}
              onUpdate={handleUpdateBudget}
              chartType={chartType} // Pass the selected chart type to BudgetCard
            />
          ))
        ) : (
          <p className="text-gray-300">No budget allocations found. Please add a budget.</p>
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default BudgetSection;
