import signUpLogo from "../../assets/images/signup.svg";
import Illustration from "../Illustration";
import SignUpFrom from "../SignUpFrom";
export default function SignUp() {
  return (
    <div>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration src={signUpLogo} alt="Signup" />
        <SignUpFrom />
      </div>
    </div>
  );
}
