import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionCard from '../Transaction/Transaction.TransactionCard.tsx';

interface Transaction {
  _id: string;
  transactionName: string;
  amount: number;
  category: string;
  paymentMethod: string;
  description?: string;
  date: string;
  transactionType: string; 
}

interface FilterSectionProps {
  onNewTransaction: () => void; 
}

const TransactionList: React.FC<FilterSectionProps> = ({ onNewTransaction }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/data/get-all-transactions`, {
        withCredentials: true
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="grid gap-4">
      {transactions.map(transaction => (
        <TransactionCard key={transaction._id} transaction={transaction} onEdit={onNewTransaction}/>
      ))}
    </div>
  );
};

export default TransactionList;
