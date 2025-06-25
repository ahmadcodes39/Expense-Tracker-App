import express from "express";
import connectToMongo from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Expenserouter from "./routes/expenseRoutes.js";
import Userrouter from "./routes/userRoutes.js";
import Budgetrouter from "./routes/budgetRoutes.js";
import cors from 'cors'
dotenv.config();
connectToMongo();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5174",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use('/api',Expenserouter);
app.use('/auth',Userrouter);
app.use('/api/budget',Budgetrouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
