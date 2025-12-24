import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
];

export default function Navigation() {
  return (
    <nav className={css.header}>
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${css["nav-link"]} ${css.active}` : css["nav-link"]
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
