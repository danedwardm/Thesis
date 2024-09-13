import Landing from "./Pages/Landing"
import Login from "./Pages/Login"
import Dashboard from "./Pages/MainAdmin/Dashboard"
import Reports from "./Pages/MainAdmin/Reports"
import Analysis from "./Pages/MainAdmin/Analysis"
import CallLogs from "./Pages/MainAdmin/CallLogs"
import Accounts from "./Pages/MainAdmin/Accounts"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/callLogs" element={<CallLogs />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
