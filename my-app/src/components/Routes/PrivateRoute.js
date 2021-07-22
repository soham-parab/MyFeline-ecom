import { useAuth } from "../../contexts/AuthContext";
import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }) {
  const { auth } = useAuth();
  console.log(path, props, "llllllll");
  return auth ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
