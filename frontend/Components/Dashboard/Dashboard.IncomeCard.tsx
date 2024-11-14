import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
interface TotalIncomeCardProps {
  Name: string;
  dataSet: number[];
  totalTransaction: number;
}

const TotalIncomeCard: React.FC<TotalIncomeCardProps> = ({ Name, dataSet, totalTransaction }) => {
  const data = {
    labels: ['', '', '', '', '', ''],  
    datasets: [
      {
        data: dataSet,  
        borderColor: 'rgba(12, 158, 12, 0.5)',  
        backgroundColor: 'rgba(255, 34, 0, 0.3)',  
        borderWidth: 2,
        fill: true,
        tension: 0.5, 
        pointRadius: 0,  
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },  
      y: { display: false },  
    },
    plugins: {
      legend: { display: false }, 
    }
  };

  return (
    <div className="bg-[#a0d8f3] shadow-lg rounded-2xl p-4 w-72 flex items-center justify-between h-44 mx-4 px-5">
      <div className="flex flex-col justify-between flex-1 h-full">
        <div className="text-gray-500 text-xl inline">{Name}</div>
        <div className="text-black text-2xl font-semibold">₹ {totalTransaction.toLocaleString()}</div>
      </div>
      <div className="w-24 h-20">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalIncomeCard;
