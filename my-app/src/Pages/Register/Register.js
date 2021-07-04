import "./Register.css";
import axios from "axios";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registerUserHandler() {
    try {
      const response = await axios.post(
        "https://my-feline-rest-api.herokuapp.com/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (!response.data.User) {
        setError(response.data);
      } else {
        navigate(state?.from ? state.from : "/");
      }
    } catch (err) {
      console.log(err);
      setError("something went wrong");
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
    <div>
      <input placeholder="Enter your name" onChange={nameHandler} />
      <input placeholder="Enter your email" onChange={emailHandler} />
      <input placeholder="Enter your password" onChange={passwordHandler} />

      <button onClick={registerUserHandler}>Register</button>
      {error && (
        <p className="errorMessage" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <p>
        Already a user? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
