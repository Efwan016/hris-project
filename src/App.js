import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/layout.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute> <MainLayout> <Dashboard /> </MainLayout> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute> <MainLayout> <Profile /> </MainLayout> </PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute> <MainLayout> <Attendance /> </MainLayout> </PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute> <MainLayout> <Employees /> </MainLayout> </PrivateRoute>} />
        <Route path="/employees/:id" element={<PrivateRoute> <MainLayout> <EmployeeDetail /> </MainLayout> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;