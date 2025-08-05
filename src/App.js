import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/layout.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute> <MainLayout> <Dashboard /> </MainLayout> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute> <MainLayout> <Profile /> </MainLayout> </PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;