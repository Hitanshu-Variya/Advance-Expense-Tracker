import React, { useState } from "react";

interface FilterSectionProps {
  onSearchChange: (searchParams: { attribute: string; value: string }) => void;
  onNewTransaction: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  onSearchChange,
  onNewTransaction,
}) => {
  const [attribute, setAttribute] = useState("transactionName");
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearchChange({ attribute, value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
      <select
        className="p-2 border rounded-md"
        value={attribute}
        onChange={(e) => setAttribute(e.target.value)}
      >
        <option value="transactionName">Transaction Name</option>
        <option value="category">Category</option>
        <option value="paymentMethod">Payment Method</option>
        <option value="transactionType">Transaction Type</option>
        <option value="date">Date</option>
      </select>
      <input
        type="text"
        className="p-2 border rounded-md flex-1"
        placeholder={`Search by ${attribute}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md"
        onClick={onNewTransaction}
      >
        New Transaction
      </button>
    </div>
  );
};

export default FilterSection;
