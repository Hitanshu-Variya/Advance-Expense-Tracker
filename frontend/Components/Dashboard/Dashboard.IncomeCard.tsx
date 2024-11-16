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
        borderColor: 'rgba(12, 158, 12, 0.7)',  // Smooth green color for the curve
        backgroundColor: 'rgba(12, 158, 12, 0.2)',  // Light green for the shaded area
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Make the curve smoother
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
    },
    elements: {
      line: {
        tension: 0.4, 
        borderCapStyle: 'round', 
      },
      point: {
        radius: 0,
      },
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#add8e6] to-[#87cefa] shadow-lg rounded-2xl p-6 w-80 flex items-center justify-between h-44 px-6">
      <div className="flex flex-col justify-between flex-1 h-full">
        <div>
          <div className="text-gray-700 text-xl font-semibold">{Name}</div>
          <div className="text-gray-500 text-sm">Income Overview</div>
        </div>
        
        <div className="text-black text-3xl font-semibold mt-4">
          ₹ {totalTransaction.toLocaleString()}
        </div>
      </div>
      
      <div className="w-32 h-28 mt-2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalIncomeCard;
