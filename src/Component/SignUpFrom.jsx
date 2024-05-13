import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../ContexApi/AuthContex";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";
import classEs from "./style/SignUp.module.css";
export default function SignUpFrom() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState();
  const [loding, setLoding] = useState();
  const { signUp } = useAuth();
  const navigat = useNavigate();
  async function handelSubmit(listen) {
    listen.preventDefault();
    /* do validation start */
    if (password !== confirmPassword) {
      return setError("Password don't match.");
    }
    try {
      setError("");
      setLoding(true);
      await signUp(email, password, userName);
      navigat("/", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      setLoding(false);
      setError("Faild to create an accout!");
    }
    /* do validation end */
  }
  return (
    <Form className={`${classEs.signup}`} onSubmit={handelSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        value={userName}
        onChange={(listen) => setUserName(listen.target.value)}
        required
      />
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(listen) => setEmail(listen.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(listen) => setPassword(listen.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(listen) => setConfirmPassword(listen.target.value)}
        required
      />
      <CheckBox
        text="I agree to the Terms & Conditions"
        value={agree}
        onChange={(listen) => setAgree(listen.target.value)}
      />
      <Button type="submit" disabled={loding}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <NavLink to="/LogIn">Login</NavLink> instead.
      </div>
    </Form>
  );
}
