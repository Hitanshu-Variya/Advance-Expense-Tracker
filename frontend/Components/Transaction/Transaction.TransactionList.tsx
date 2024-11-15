import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionCard from "../Transaction/Transaction.TransactionCard.tsx";

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

interface TransactionListProps {
  onNewTransaction: () => void;
  searchParams: { attribute: string; value: string };
}

const TransactionList: React.FC<TransactionListProps> = ({
  onNewTransaction,
  searchParams,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/data/get-all-transactions`, {
          withCredentials: true,
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [onNewTransaction]);

  const filteredTransactions = transactions.filter((transaction) =>
    searchParams.attribute
      ? transaction[searchParams.attribute as keyof Transaction]
          ?.toString()
          .toLowerCase()
          .includes(searchParams.value.toLowerCase())
      : true
  );

  return (
    <div className="grid gap-4">
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          <TransactionCard
            key={transaction._id}
            transaction={transaction}
            onEdit={onNewTransaction}
          />
        ))
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;