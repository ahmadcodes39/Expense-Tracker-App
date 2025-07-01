import express from "express";
import { authenticateUser } from "../controllers/userController.js";

import {
  addExpense,
  deleteExpense,
  updateExpense,
  expenses,
  singleExpenseDetails,
  expenseByCategory,
  getExpenseSummary,
  latestTenDaysExpenses,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/addExpense/:userId/:budgetId",authenticateUser, addExpense);
router.delete("/deleteExpense/:id",authenticateUser, deleteExpense);
router.put("/updateExpense/:id",authenticateUser, updateExpense);
router.get("/expense/:userId",authenticateUser, expenses);
router.get("/expense/details/:id",authenticateUser, singleExpenseDetails);
router.get("/expense/budget/:budgetId",authenticateUser, expenseByCategory);   
router.get("/expenses/:userId",authenticateUser, latestTenDaysExpenses);
router.get("/expenses/:userId/summary",authenticateUser, getExpenseSummary);



export default router;
