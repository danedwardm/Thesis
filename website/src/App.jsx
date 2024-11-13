import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/MainAdmin/Dashboard";
import Reports from "./Pages/MainAdmin/Reports";
import Analysis from "./Pages/MainAdmin/Analysis";
import Accounts from "./Pages/MainAdmin/Accounts";
import Notification from "./Pages/MainAdmin/Notification";
import DeptDashboard from "./Pages/DeptAdmin/Dashboard";
import DeptReports from "./Pages/DeptAdmin/Reports";
import DeptAnalysis from "./Pages/DeptAdmin/Analysis";
import DeptNotification from "./Pages/DeptAdmin/Notification";
import DeptAccounts from "./Pages/DeptAdmin/Accounts";
import { useAuth } from "./AuthContext/AuthContext"; // Import the AuthContext
import ProtectedRoutes from "./Components/ProtectedRoutes"; // Import the new component

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReportTrends from "./Chart/ReportTrends";
import ReportCategoryChart from "./Chart/ReportCategoryChart";
import PieChart from "./Chart/PieChart";

function App() {
  const { account_type, authenticated } = useAuth(); // Access authentication status

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="/login"
          element={
            authenticated ? (
              // Redirect to the correct dashboard based on account_type if already authenticated
              account_type === "superadmin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : account_type === "department_admin" ? (
                <Navigate to="/dept-admin/dashboard" replace />
              ) : (
                <Navigate to="/login" /> // This is more explicit in case something went wrong
              )
            ) : (
              <Login /> // Show Login component if not authenticated
            )
          }
        />

        {/* Protect the routes that should only be accessible by authenticated users */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/analysis" element={<Analysis />} />
          <Route path="/admin/notification" element={<Notification />} />
          <Route path="/admin/accounts" element={<Accounts />} />

          <Route path="/dept-admin/dashboard" element={<DeptDashboard />} />
          <Route path="/dept-admin/reports" element={<DeptReports />} />
          <Route path="/dept-admin/analysis" element={<DeptAnalysis />} />
          <Route
            path="/dept-admin/notification"
            element={<DeptNotification />}
          />
          <Route path="/dept-admin/accounts" element={<DeptAccounts />} />
          <Route path="/linechart" element={<ReportTrends />} />
          <Route path="/barchart" element={<ReportCategoryChart />} />
          <Route path="/piechart" element={<PieChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
