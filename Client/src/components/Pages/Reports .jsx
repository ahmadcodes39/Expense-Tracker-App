import React from 'react';
import ReportsSummary from '../ReportsComponent/ReportsSummary';
import ExpenseHealthScore from '../ReportsComponent/ExpenseHealthScore';
import FinancePerformance from '../ReportsComponent/FinancePerformance';
import TopExpenseCategory from '../ReportsComponent/TopExpenseCategory';

const Reports = () => {
  return (
    <div className="">
      {/* Reports Summary - Full width */}
      <h1 className='text-2xl text-blue-800 font-bold mb-4'>Summary Report</h1>
      <ReportsSummary />

      {/* Grid layout for the other cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* <ExpenseHealthScore /> */}
        <FinancePerformance />
        <TopExpenseCategory />
      </div>
    </div>
  );
};

export default Reports;
