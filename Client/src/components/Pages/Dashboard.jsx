import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardTopBar from "../DashboardComponent/DashboardTopBar";
import StatCards from "../DashboardComponent/StatCards";
import { MdOutlineSavings } from "react-icons/md";
import { FaDolly, FaMoneyBillWave, FaWallet } from "react-icons/fa"; // Added FaWallet icon
import { fetchStats, getAllBudgets } from "../../utils/ApiRoutes";
import SummaryChart from "../DashboardComponent/SummaryChart";
import CategoryItem from "../CategoriesComponent/CategoryItem";
import { tenDaysLatestExpenses } from "../../utils/ApiRoutes";
import ExpenseTable from "../IndividualBudgetComponents/ExpenseTabel";
const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [response, setResponse] = useState(null);
  const [latestExpense,setLatestExpense] = useState([])
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  useEffect(() => {
    const loadBudgets = async () => {
      if (!userId) return;
      try {
        const response = await getAllBudgets(userId);
        const response2 = await tenDaysLatestExpenses(userId)
        setBudgets(response.budgets || []);
        setLatestExpense(response2.data || []) 
      } catch (error) {
        console.error("Failed to fetch budgets:", error.message);
      }
    };

    if (userId) {
      loadBudgets();
    }
  }, [userId]);

  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        const response = await fetchStats(userId);
        if (response) {
          setTotalBudget(
            response.totalBudget?.reduce((acc, val) => acc + val, 0) || 0
          );
          setTotalSpend(
            response.totalSpend?.reduce((acc, val) => acc + val, 0) || 0
          );
          setTotalCategories(response.totalEntries || 0);
          setResponse(response);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
      }
    };

    getData();
  }, [userId]);

  const remainingBudget = totalBudget - totalSpend;
  const remainingPercentage =
    totalBudget > 0 ? (remainingBudget / totalBudget) * 100 : 0;

  const getProgressColor = () => {
    if (remainingPercentage < 15) return "bg-red-500";
    if (remainingPercentage < 35) return "bg-orange-500";
    if (remainingPercentage < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardTopBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCards
          title="Total Budget"
          amount={`$${totalBudget}`}
          icon={<MdOutlineSavings />}
        />
        <StatCards
          title="Total Spend"
          amount={`$${totalSpend}`}
          icon={<FaDolly />}
        />
        <StatCards
          title="No. of Budgets"
          amount={totalCategories}
          icon={<FaMoneyBillWave />}
        />
        <StatCards
          title="Remaining Budget"
          amount={`$${remainingBudget}`}
          icon={<FaWallet />}
        />
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${remainingPercentage}%` }}
        ></div>
      </div>
      <p className="text-gray-600 font-bold text-sm">
        Remaining: {remainingPercentage.toFixed(2)}%
      </p>

      <div className="flex justify-between gap-2.5">
        <div className="flex flex-col gap-1.5 w-full">

          <SummaryChart />
          <ExpenseTable expenseData={latestExpense}/>
        </div>
        

        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-black font-bold text-lg">Latest Budgets</h2>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <Link key={budget._id} to={`/${budget._id}/${budget.category}`}>
                <CategoryItem
                  emoji={budget.emoji || "💰"}
                  category={budget.category || "Unknown"}
                  items={budget.itemsCount || 0}
                  amount={budget.totalAmount || 0}
                  spent={budget.spentAmount || 0}
                />
              </Link>
            ))
          ) : (
            <p>No budgets available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
