import { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryCard from '../Dashboard/Dashboard.HistoryCard.tsx';

interface Transaction {
  id: number;
  transactionName: string;
  date: Date;
  amount: number;
  transactionType: 'income' | 'expense';
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/data/transactions/latest`, {
        withCredentials: true,
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="w-96 bg-gray-50 mt-4 h-96 p-4 overflow-y-auto rounded-md shadow-lg flex flex-col gap-y-3">
      {transactions.slice(0, 10).map((transaction) => (
        <HistoryCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionHistory;
