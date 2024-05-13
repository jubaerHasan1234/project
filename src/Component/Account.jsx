import { NavLink } from "react-router-dom";
import { useAuth } from "../ContexApi/AuthContex";
import classEs from "./style/Account.module.css";
export default function Account() {
  const { currentUser, logOut } = useAuth();
  return (
    <div className={classEs.account}>
      <span className="material-icons-outlined" title="Account">
        account_circle
      </span>
      {currentUser ? (
        <>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logOut}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <NavLink to="/SignUp">Sign up</NavLink>
          <NavLink to="/LogIn">Log in</NavLink>
        </>
      )}
    </div>
  );
}
