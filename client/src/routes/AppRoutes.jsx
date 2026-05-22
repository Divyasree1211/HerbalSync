import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Nutrition from "../pages/Nutrition";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="page">{children}</main>
      </div>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
        <Route path="/products" element={<AppShell><Products /></AppShell>} />
        <Route path="/products/:id" element={<AppShell><ProductDetails /></AppShell>} />
        <Route path="/nutrition" element={<AppShell><Nutrition /></AppShell>} />
        <Route path="/favorites" element={<AppShell><Favorites /></AppShell>} />
        <Route path="/profile" element={<AppShell><Profile /></AppShell>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
