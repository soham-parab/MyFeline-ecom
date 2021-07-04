import "./Logout.css";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { auth, setAuth } = useAuth();

  function logoutHandler() {
    setAuth(() => {
      localStorage.removeItem("auth");
    });
  }

  return (
    <div>
      <div>
        <h1>Are you sure you want to log out?</h1>
        <button className="btnPrimary" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
