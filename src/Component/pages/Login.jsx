import LogInLogo from "../../assets/images/login.svg";
import Illustration from "../Illustration";
import LogInFrom from "../LogInFrom";
export default function LogIn() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration src={LogInLogo} alt="Login" />
        <LogInFrom />
      </div>
    </>
  );
}
