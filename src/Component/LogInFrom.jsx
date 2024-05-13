import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../ContexApi/AuthContex";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
import classEs from "./style/LogIn.module.css";
export default function LogInFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loding, setLoding] = useState();
  const { logIn } = useAuth();
  const navigat = useNavigate();
  async function handelSubmit(listen) {
    listen.preventDefault();
    /* do validation start */
    try {
      setError("");
      setLoding(true);
      await logIn(email, password);
      navigat("/", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
      setLoding(false);
      setError("Faild to log in!");
    }
    /* do validation end */
  }
  return (
    <Form className={`${classEs.login}`} onSubmit={handelSubmit}>
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email "
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
      <Button type="submit" disabled={loding}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <NavLink to="/SignUp">Signup</NavLink> instead.
      </div>
    </Form>
  );
}
