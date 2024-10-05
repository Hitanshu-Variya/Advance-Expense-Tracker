import Sidebar from '../Components/Dashboard/Dashboard.sideBar.tsx';
import Header from '../Components/Dashboard/Dashboard.Header.tsx';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Header name="Hitanshu" page="Dashboard"/>
      <Sidebar />

      <main className="flex-1 p-6 ml-24 md:ml-52 lg:ml-56 xl:ml-64">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Total Income</h3>
            <p className="mt-2 text-2xl">$5000</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Total Expenses</h3>
            <p className="mt-2 text-2xl">$3000</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Remaining Balance</h3>
            <p className="mt-2 text-2xl">$2000</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
