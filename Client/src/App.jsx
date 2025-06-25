import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProtectedRoute from "./utils/ProtectedRoute";
import LeftPanel from "./components/LeftPanelComponent/leftPanel";
import Budgets from "./components/Pages/Budgets";
import Dashboard from "./components/Pages/Dashboard";
import Expenses from "./components/Pages/Expenses ";
import Payments from "./components/Pages/Payments ";
import Reports from "./components/Pages/Reports ";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Landing from "./components/Pages/Landing";
import NotFound from "./components/Pages/NotFound ";
import ForgotPassword from "./components/Pages/ForgotPassword";
import UpdatePassword from "./components/Pages/UpdatePassword";
import "./index.css";
import IndividualBudget from "./components/Pages/IndividualBudget";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ["/login", "/signup", "/"];

  // Check if the current route is in the list of routes where sidebar should be shown
  const shouldShowSidebar = ["/dashboard", "/budgets", "/expenses", "/payments", "/reports"]
    .some(route => location.pathname.startsWith(route)) || location.pathname.match(/^\/\w+\/\w+/);

  return (
    <div className="flex h-screen">
      {shouldShowSidebar && (
        <div className="w-56 bg-white shadow-2xl">
          <LeftPanel />
        </div>
      )}
      <motion.div
        className="flex-1 p-6 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/:id/:token" element={<UpdatePassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/:id/:category" element={<IndividualBudget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
