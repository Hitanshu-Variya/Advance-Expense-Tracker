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
    <div className="w-[430px] max-w-2xl bg-gradient-to-b from-[#add8e6] to-[#87cefa] rounded-2xl shadow-lg p-6 mt-4">
      {/* Transaction History Heading */}
      <div className="text-lg font-bold text-gray-800 mb-2">Transaction History</div>

      {/* History Cards Section */}
      <div className="space-y-1">
        {transactions.slice(0, 7).map((transaction) => (
          <div key={transaction.id}>
            {/* History Card Content */}
            <HistoryCard transaction={transaction} />
            
            {/* Horizontal Divider */}
            <hr className="border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
