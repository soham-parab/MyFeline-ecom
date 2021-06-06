import React from "react";
import { useState, createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const { auth, setAuth } = useState(
      JSON.parse(localStorage.getItem("auth")) || ""
   );

   return (
      <AuthContext.Provider value={{ auth, setAuth }}>
         {children}
      </AuthContext.Provider>
   );
};

export function useAuth() {
   return useContext(AuthContext);
}