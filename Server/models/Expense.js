import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  userId: {
   type:mongoose.Schema.Types.ObjectId, // Reference to user
    ref: "User",
    required: true,
  },
  budgetId: {  // Reference to the Budget Category
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

export default mongoose.model("Expense", ExpenseSchema);
