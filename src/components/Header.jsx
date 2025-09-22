import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

export const Header = () => {
  const [toggleBtn, setToggleBtn] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <Link to={"/"}>
          <img className="logo" src={LOGO_URL} alt="Food-App" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>
          <button
            className="login"
            onClick={() => {
              toggleBtn === "Login"
                ? setToggleBtn("Logout")
                : setToggleBtn("Login");
            }}
          >
            {toggleBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};
