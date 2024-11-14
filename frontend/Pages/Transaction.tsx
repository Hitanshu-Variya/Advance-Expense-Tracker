import { useState } from 'react';
import FilterSection from '../Components/Transaction/Transaction.FilterSection.tsx';
import TransactionList from '../Components/Transaction/Transaction.TransactionList.tsx';

const TransactionPage = () => {
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  const handleNewTransaction = () => {
    setRefreshTransactions(!refreshTransactions);  
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Transaction Tracker</h1>
      <FilterSection onNewTransaction={handleNewTransaction} />
      <TransactionList key={refreshTransactions ? 1 : 0} onNewTransaction={handleNewTransaction} />
    </div>
  );
};

export default TransactionPage;
