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
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "../../contexts/toastContext";
import { Spinner } from "@chakra-ui/spinner";
export function Login() {
  const { auth, setAuth } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  async function loginHandlerDefault() {
    try {
      setStatus("loading");
      const response = await axios.post(
        "https://my-feline-rest-api.herokuapp.com/login",
        {
          email: "testuser@test.com",
          password: "useruser",
        }
      );
      if (!response.data.token) {
        setStatus("idle");
        setError(response.data);
      } else {
        setAuth(response.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          setStatus("idle");
          return prev;
        });
        console.log(state);
        navigate(state?.from ? state.from : "/");
      }
      toast("Logged In!", {
        type: "success",
      });
    } catch (error) {
      setStatus("idle");
      setError(error.response.data);
      console.log(error.response.data);
    }
  }

  async function loginHandler() {
    try {
      setStatus("loading");
      const response = await axios.post(
        "https://my-feline-rest-api.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      if (!response.data.token) {
        setStatus("idle");
        setError(response.data);
      } else {
        setAuth(response.data);
        setAuth((prev) => {
          localStorage.setItem("auth", JSON.stringify(prev));
          setStatus("idle");
          return prev;
        });
        console.log(state);
        navigate(state?.from ? state.from : "/");
      }
      toast("Logged In!", {
        type: "success",
      });
    } catch (error) {
      setStatus("idle");
      setError(error.response.data);
      console.log(error.response.data);
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
    <div className="main-div">
      <div className="main-div-two">
        <input
          type="email"
          className="input-login"
          placeholder="Enter your email"
          onChange={emailHandler}
        />
        <input
          type="password"
          className="input-login"
          placeholder="Enter your password"
          onChange={passwordHandler}
        />

        <Button
          overflowY="hidden"
          padding="1rem"
          className="login-button"
          onClick={loginHandler}
        >
          {status === "idle" && <span>Log In</span>}
          {status === "loading" && <Spinner />}
        </Button>

        <Button
          overflowY="hidden"
          padding="1rem"
          className="login-button"
          onClick={loginHandlerDefault}
        >
          {status === "idle" && <span>Log In as a Test User instead.</span>}
          {status === "loading" && <Spinner />}
        </Button>

        {error && (
          <p className="errorMessage" style={{ color: "red", padding: "1rem" }}>
            {error}
          </p>
        )}

        <p>
          Don't have an account?{" "}
          <Link className="signup-link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
