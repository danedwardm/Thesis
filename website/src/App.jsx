import React, { useState, useEffect } from "react";
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
import DeptAccounts from "./Pages/DeptAdmin/Accounts";
import { useAuth } from "./AuthContext/AuthContext"; // Import the AuthContext
import ProtectedRoutes from "./Components/ProtectedRoutes"; // Import the new component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReportTrends from "./Chart/ReportTrends";
import ReportCategoryChart from "./Chart/ReportCategoryChart";
import PieChart from "./Chart/PieChart";
import OtpModal from "./Components/Modals/OtpModal"; // Import the OTP modal
import PopUpNotif from "./Components/Modals/PopUpNotif";

function App() {
  const { account_type, authenticated, emailVerified } = useAuth(); // Access authentication status and email verification status
  const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP Modal visibility

  const handleOtpModalClose = () => setShowOtpModal(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        message: `This is a new notification at ${new Date().toLocaleTimeString()}`,
        type: Math.random() > 0.5 ? "success" : "error", // Randomly pick success or error
        id: Date.now(),
      };
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    }, 10000); // Add a new notification every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            authenticated ? (
              account_type === "superadmin" ? (
                emailVerified ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Login
                    showOtpModal={true}
                    setShowOtpModal={setShowOtpModal}
                  />
                )
              ) : account_type === "department_admin" ? (
                emailVerified ? (
                  <Navigate to="/dept-admin/dashboard" replace />
                ) : (
                  <Login
                    showOtpModal={true}
                    setShowOtpModal={setShowOtpModal}
                  />
                )
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Login showOtpModal={false} />
            )
          }
        />

        {/* Admin and Department Admin Redirects */}
        <Route
          path="/admin/*"
          element={
            authenticated ? (
              account_type === "superadmin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/dept-admin/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/dept-admin/*"
          element={
            authenticated ? (
              account_type === "department_admin" ? (
                <Navigate to="/dept-admin/dashboard" replace />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protect the routes based on authentication */}
        <Route element={<ProtectedRoutes />}>
          {/* Admin Routes */}
          {account_type === "superadmin" && (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/analysis" element={<Analysis />} />
              <Route path="/admin/notification" element={<Notification />} />
              <Route path="/admin/accounts" element={<Accounts />} />
            </>
          )}

          {/* Department Admin Routes */}
          {account_type === "department_admin" && (
            <>
              <Route path="/dept-admin/dashboard" element={<DeptDashboard />} />
              <Route path="/dept-admin/reports" element={<DeptReports />} />
              <Route path="/dept-admin/analysis" element={<DeptAnalysis />} />
              <Route path="/dept-admin/accounts" element={<DeptAccounts />} />
            </>
          )}

          {/* Chart Routes */}
          <Route path="/linechart" element={<ReportTrends />} />
          <Route path="/barchart" element={<ReportCategoryChart />} />
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/trends" element={<ReportTrends />} />
        </Route>
      </Routes>

      {/* OTP Modal, conditionally shown when the user is not verified */}
      {showOtpModal && (
        <OtpModal
          isVisible={showOtpModal}
          onClose={handleOtpModalClose}
          onSubmit={() => {}}
          onResend={() => {}}
        />
      )}

      {notifications.map((notif, index) => (
        <PopUpNotif
          key={notif.id}
          message={notif.message}
          type={notif.type}
          isOpen={true}
          onClose={() => removeNotification(notif.id)}
          index={index} // Pass index for proper stacking
        />
      ))}
    </BrowserRouter>
  );
}

export default App;
