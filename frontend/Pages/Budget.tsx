import { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetCard from '../Components/Budget/Budget.BudgetCard.tsx'; // Ensure correct import path
import { categories, Category } from '../Interfaces/Interfaces';
import { Budget } from '../Interfaces/Interfaces';

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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Budget Allocation</h2>

      {/* Dropdown to select chart type */}
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

      {/* Show loading message or render budget cards */}
      {isLoading ? (
        <p>Loading budgets...</p>
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
            <p>No budget allocations found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetSection;
