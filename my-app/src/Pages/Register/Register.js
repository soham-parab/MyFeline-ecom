import "./Register.css";
import axios from "axios";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { baseURL } from "../../components/utilities/baseURL";
import { useAuth } from "../../contexts/AuthContext";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
export function Register() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const { auth, setAuth } = useAuth();
  async function registerUserHandler() {
    setStatus("loading");
    try {
      const response = await axios.post(`${baseURL}/register`, {
        name: name,
        email: email,
        password: password,
      });

      if (!response.data.User) {
        setStatus("idle");
        setError(response.data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setStatus("idle");
      console.log(err);
      setError(err.response.data);
    }
  }

  function nameHandler(event) {
    setName(event.target.value);
  }

  function emailHandler(event) {
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="main-div">
      <div className="main-div-two">
        <input
          className="input-register"
          placeholder="Enter your name"
          onChange={nameHandler}
        />
        <input
          className="input-register"
          placeholder="Enter your email"
          onChange={emailHandler}
        />
        <input
          type="password"
          className="input-register"
          placeholder="Enter your password"
          onChange={passwordHandler}
        />

        <Button className="register-button" onClick={registerUserHandler}>
          {status === "idle" && <span>Register</span>}
          {status === "loading" && <Spinner />}
        </Button>
        {error && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <p>
          Already a user?{" "}
          <Link className="login-link" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
