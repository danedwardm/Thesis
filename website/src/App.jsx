import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Dashboard from "./Pages/MainAdmin/Dashboard";
import Reports from "./Pages/MainAdmin/Reports";
import Analysis from "./Pages/MainAdmin/Analysis";
import Notification from "./Pages/MainAdmin/Notification";
import Accounts from "./Pages/MainAdmin/Accounts";
import { useAuth } from "./AuthContext/AuthContext"; // Import the AuthContext
import ProtectedRoutes from "./Components/ProtectedRoutes"; // Import the new component

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReportTrends from "./Chart/ReportTrends";
import ReportCategoryChart from "./Chart/ReportCategoryChart";
import PieChart from "./Chart/PieChart";

function App() {
  const { authenticated } = useAuth(); // Access authentication status

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protect the routes that should only be accessible by authenticated users */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/linechart" element={<ReportTrends />} />
          <Route path="/barchart" element={<ReportCategoryChart />} />
          <Route path="/piechart" element={<PieChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
