import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCat, FaShoppingCart } from "react-icons/fa";
import { BsHeartFill, BsFillHouseFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";

export function Nav() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  function logoutHandler() {
    setAuth(() => {
      localStorage.removeItem("auth");
    });
  }
  return (
    <div className="main-nav-div">
      <div className="nav-header">
        <p
          onClick={() => {
            navigate("/");
          }}
          className="para"
        >
          MyFeline <FaCat />{" "}
        </p>
      </div>
      <div className="nav-div">
        <ul className="nav">
          <li className="nav-item">
            <Link className="link-nav" to="/">
              Home <BsFillHouseFill className="icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-nav" to="/cart">
              Cart <FaShoppingCart className="icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-nav" to="/wishlist">
              Wishlist <BsHeartFill className="icon" />
            </Link>
          </li>
          {!auth ? (
            <li className="nav-item">
              <Link className="link-nav-log" to="/login">
                Login / Signup
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                className="link-nav-log"
                onClick={logoutHandler}
                to="/login"
              >
                Signout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
