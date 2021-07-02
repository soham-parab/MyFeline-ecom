import "./nav.css";
import { Link } from "react-router-dom";
import { FaCat, FaShoppingCart } from "react-icons/fa";
import { BsHeartFill, BsFillHouseFill } from "react-icons/bs";

export function Nav() {
  return (
    <div className="main-nav-div">
      <div className="nav-header">
        <p className="para">
          MyFeline <FaCat />
        </p>
      </div>
      <div className="nav-div">
        <ul className="nav">
          <li classNameName="nav-item">
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
        </ul>
      </div>
    </div>
  );
}
