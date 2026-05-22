import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getInitials } from "../../utils/helpers";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to={isAuthenticated ? "/dashboard" : "/login"} className="brand">
        <span className="brand-mark">H</span>
        <span>HerbalSync</span>
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/nutrition">Nutrition</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
      {isAuthenticated && (
        <div className="nav-user">
          <Link to="/profile" className="avatar" aria-label="Profile">
            {getInitials(user?.name)}
          </Link>
          <button type="button" className="btn small" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
