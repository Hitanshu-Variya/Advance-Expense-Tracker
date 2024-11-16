import React from 'react';
import { BiDollarCircle } from 'react-icons/bi';

interface Transaction {
  id: number;
  transactionName: string;
  date: Date;
  amount: number;
  transactionType: 'income' | 'expense';
}

interface HistoryCardProps {
  transaction: Transaction;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ transaction }) => {
  const { transactionName, date, amount, transactionType } = transaction;
  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  return (
    <div className="p-2 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            transactionType === 'income' ? 'bg-green-200' : 'bg-red-200'
          } text-xl text-gray-600`}
        >
          <BiDollarCircle />
        </div>

        <div>
          <h3 className="font-bold text-gray-700">{transactionName}</h3>
          <p className="text-sm font-semibold text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-base font-bold ${
            transactionType === 'income' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {transactionType === 'income' ? '+' : '-'}${amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;
