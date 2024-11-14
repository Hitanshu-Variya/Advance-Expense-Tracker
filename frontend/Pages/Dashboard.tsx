import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Dashboard/Dashboard.sideBar.tsx';
import Header from '../Components/Dashboard/Dashboard.Header.tsx';
import TotalIncomeCard from '../Components/Dashboard/Dashboard.IncomeCard.tsx';
import TransactionHistory from '../Components/Dashboard/Dashboard.transactionHistory.tsx';

const Dashboard = () => {
  const [totalTransaction, setTotalTransaction] = useState({ income: 0, expense: 0 });
  const [incomeDataSet, setIncomeDataSet] = useState<number[]>([]);
  const [expenseDataSet, setExpenseDataSet] = useState<number[]>([]);

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

  useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpense();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <Header name="Hitanshu" page="Dashboard" />
          <div className="flex justify-start">
            <TotalIncomeCard Name="Total Income" dataSet={incomeDataSet} totalTransaction={totalTransaction.income} />
            <TotalIncomeCard Name="Total Expense" dataSet={expenseDataSet} totalTransaction={totalTransaction.expense} />
          </div>
          <TransactionHistory />
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;
