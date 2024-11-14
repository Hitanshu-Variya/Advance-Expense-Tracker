import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
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
    <div className="bg-white hover:bg-gray-100 transition duration-200 rounded-lg p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            transactionType === 'income' ? 'bg-green-100' : 'bg-red-100'
          } text-2xl text-gray-600`}
        >
          <BiDollarCircle />
        </div>

        <div className="ml-4">
          <h3 className="font-semibold text-gray-700">{transactionName}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="text-right flex items-center gap-x-4">
        <p
          className={`text-lg font-semibold ${
            transactionType === 'income' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {transactionType === 'income' ? '+' : '-'}${amount.toFixed(2)}
        </p>
        <FaArrowRight className="text-gray-400" />
      </div>
    </div>
  );
};

export default HistoryCard;
