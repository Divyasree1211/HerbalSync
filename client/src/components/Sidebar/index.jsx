import { NavLink } from "react-router-dom";

const links = [
  ["Dashboard", "/dashboard"],
  ["Products", "/products"],
  ["Nutrition", "/nutrition"],
  ["Favorites", "/favorites"],
  ["Profile", "/profile"],
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <span className="sidebar-label">Wellness</span>
      {links.map(([label, to]) => (
        <NavLink key={to} to={to}>
          {label}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
