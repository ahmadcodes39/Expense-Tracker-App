import React, { useState } from "react";
import MyExpenseTable from "../MyExpensesComponent/MyExpenseTable";
import MyExpenseTopBar from "../MyExpensesComponent/MyExpenseTopBar";

const Expenses = () => {
  const [query,setQuery] = useState("all")
  return (
    <div>
      <MyExpenseTopBar setQuery={setQuery}/>
      <h2 className="text-md font-bold text-black mb-4">Latest Expenses</h2>
      <MyExpenseTable  query={query}/>
    </div>
  );
};

export default Expenses;
