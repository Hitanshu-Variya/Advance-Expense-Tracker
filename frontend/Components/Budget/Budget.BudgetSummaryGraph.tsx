import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetSummaryGraph = ({ budgetData, expenseData, categories }: { budgetData: number[]; expenseData: number[]; categories: string[] }) => {
  // The labels will be the categories, such as "Groceries", "Entertainment", etc.
  const data = {
    labels: categories, // Categories are passed as props
    datasets: [
      {
        label: 'Budget',
        data: budgetData,
        backgroundColor: 'rgb(34, 197, 94)', // Green
        borderColor: 'rgb(34, 197, 94)', // Green border
        borderWidth: 1,
        barThickness: 30, // Adjust the thickness of the bars
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgb(255, 99, 132)', // Red
        borderColor: 'rgb(255, 99, 132)', // Red border
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-gray-800 rounded-md shadow-lg h-[390px]">
      <h2 className="text-2xl flex justify-center font-semibold text-white">Budget vs Expenses by Category</h2>
      <div className="h-[320px] flex justify-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetSummaryGraph;
