import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Dashboard/Dashboard.sideBar.tsx';
import LiveTimer from '../Components/Dashboard/Dashboard.LiveTimer.tsx';
import TotalIncomeCard from '../Components/Dashboard/Dashboard.IncomeCard.tsx';
import TransactionHistory from '../Components/Dashboard/Dashboard.transactionHistory.tsx';
import BudgetSummaryGraph from '../Components/Budget/Budget.BudgetSummaryGraph.tsx';
import { categories } from '../Interfaces/Interfaces.ts';

type Category = 'Food' | 'Transport' | 'Health' | 'Education' | 'Entertainment' | 'Shopping' | 'Utilities' | 'Others';
interface CategoryTotals {
  [key: string]: number;
}

const Dashboard = () => {
  const [totalTransaction, setTotalTransaction] = useState({ income: 0, expense: 0 });
  const [incomeDataSet, setIncomeDataSet] = useState<number[]>([]);
  const [expenseDataSet, setExpenseDataSet] = useState<number[]>([]);
  const [budgetData, setBudgetData] = useState<number[]>([]); 
  const [expenseData, setExpenseData] = useState<number[]>([]); 
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile/get-profile`, {
        withCredentials: true,
      });
      setUsername(response.data.name);
    };

    fetchUsername();
  }, []);

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/data/transactions/total-income`, {
        withCredentials: true,
      });
      setTotalTransaction(prev => ({ ...prev, income: response.data.totalIncome }));
      setIncomeDataSet(response.data.transactions);
    } catch (error) {
      console.error("Error fetching total income:", error);
    }
  };

  const fetchTotalExpense = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/data/transactions/total-expense`, {
        withCredentials: true,
      });
      setTotalTransaction(prev => ({ ...prev, expense: response.data.totalExpense }));
      setExpenseDataSet(response.data.transactions);
    } catch (error) {
      console.error("Error fetching total expense:", error);
    }
  };

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/budget/summary-budget`, {
        withCredentials: true,
      });

      const expenses = response.data.expenses;
      const categoryTotals: CategoryTotals = {};
      
      categories.forEach(category => {
        categoryTotals[category] = 0;
      });

      expenses.forEach((expense: { category: Category; amount: number }) => {
        categoryTotals[expense.category] += expense.amount;
      });
      
      const expensesAmounts = categories.map((category) =>
        categoryTotals[category] || 0,
      );

      const budgetAmountsInOrder = categories.map((category) => {
        const budget = response.data.budgets.find((b: { category: string }) => b.category === category);
        return budget ? budget.amount : 0; 
      });

      setBudgetData(budgetAmountsInOrder);
      setExpenseData(expensesAmounts);

    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpense();
    fetchBudgetData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <div
            className="w-full h-[33vh] p-6 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://t3.ftcdn.net/jpg/06/02/66/76/360_F_602667660_gMzX74MC34kXy7pTlt3OoCreddAbNQOR.jpg')`,
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl mt-2 font-bold text-white">Hello {username ? username : "User"}! 👋</h1>
              </div>

              <div className="text-right">
                <div className="text-xl font-semibold text-blue-200">
                  <LiveTimer />
                </div>
              </div>
            </div>
          </div>

          <div className="relative -mt-28 flex gap-6 ml-20">
            <div className="flex flex-col">
              <div className='flex gap-14 justify-between '>
                <TotalIncomeCard Name="Total Income" dataSet={incomeDataSet} totalTransaction={totalTransaction.income} />
                <TotalIncomeCard Name="Total Expense" dataSet={expenseDataSet} totalTransaction={totalTransaction.expense} />
              </div>
              <div className="flex-grow mt-4 -mx-10">
                <BudgetSummaryGraph budgetData={budgetData} expenseData={expenseData} categories={categories} />
              </div>
            </div>

            <div className="flex-grow flex justify-end mr-5">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
