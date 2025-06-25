import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import BudgetButton from "./budgetButton";

const BudgetTopBar = () => {
  const { category } = useParams();

  // State for modals
  return (
    <div className="flex justify-between items-center mb-3.5">
      <div className="flex gap-3 justify-center items-center">
        <Link to={"/budgets"}>
          <IoMdArrowRoundBack className="text-2xl mb-3" />
        </Link>
        <p className="text-2xl font-bold text-blue-800 mb-4">
          {category} Expenses
        </p>
      </div>
      <section className="flex gap-1.5 items-center">
        <BudgetButton
          color="bg-blue-600"
          text="Edit"
          icon={<FaRegEdit />}
          onClick={() => {
            
          }}
        />
        <BudgetButton
          color="bg-red-600"
          text="Delete"
          icon={<RiDeleteBinLine />}
          onClick={() => {
          }}
        />
      </section>

     
    </div>
  );
};

export default BudgetTopBar;
