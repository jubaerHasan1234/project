import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo-bg.png";
import Account from "./Account";
import classEs from "./style/Nav.module.css";
export default function Nav() {
  return (
    <nav className={classEs.nav}>
      <ul>
        <li>
          <NavLink to="/" className={classEs.brand}>
            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </NavLink>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
