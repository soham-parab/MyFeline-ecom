import "./Login.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

export function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginHandler() {
    try {
      const response = await axios.post(
        "https://my-feline-rest-api.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      if (!response.data.token) {
        setError(response.data);
      } else {
        setAuth(response.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          return prev;
        });

        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function emailHandler(event) {
    setEmail(event.target.value);
    console.log(email);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
    console.log(password);
  }

  return (
    <div>
      <input
        className="input"
        placeholder="Enter your email"
        onChange={emailHandler}
      />
      <input placeholder="Enter your password" onChange={passwordHandler} />

      <button onClick={loginHandler}>Login</button>

      {error && (
        <p className="errorMessage" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <p>
        Don't have an account, <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}
