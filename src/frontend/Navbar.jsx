import {
  Facebook,
  YouTube,
  Map,
  Phone,
  Pinterest,
  Twitter,
  HomeOutlined,
  NavigateBefore,
  RoundedCorner,
  BarChartSharp,
  LocalActivity,
  LocalActivityOutlined,
  LocationCity,
  AddAlertSharp,
  Search,
  Star,
  Telegram,
  PetsRounded,
  CardGiftcard,
  GifSharp,
  GifOutlined,
  ShopSharp,
  ShoppingBasket,
  DragHandle,
  DragHandleSharp,
  DragIndicator,
  DragHandleRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Navbar.css";
import logo from "./logo/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar({ user, handleLogout }) {
  const userId = user?.uid;
  //const [mobilenav, setMobilenav] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [active, setactive] = useState(false);

  function handlenavmobile() {
    setactive(!active);
  }
  let moblinavopen = active ? "active" : null;

  return (
    <div className="navbar">
      <div className="top-nav-bar">
        <div className="left-icons-holder">
          <Facebook className="top-social-icon" />
          <Twitter className="top-social-icon" />
          <Pinterest className="top-social-icon" />
          <YouTube className="top-social-icon" />
        </div>
        <div className="right-content-topbar-holder">
          <div className="number-top-holder">
            <Phone className="top-social-icon number-holder" />
            233558602996
          </div>
          <div className="number-top-holder">
            <Phone className="top-social-icon number-holder" />
            233558602996
          </div>

          {/* <Map className="top-social-icon" /> */}
          <div className="number-top-holder">
            <AddAlertSharp className="top-social-icon" />
            Address&nbsp;Awoshie Market Accra Ghana
          </div>
          {/* <HomeOutlined />
          <RoundedCorner />
          <BarChartSharp /> */}
        </div>
      </div>
      {/* secondnave */}
      <div className="second-top-nav">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="search-top-form">
          <input type="text" placeholder="Search products" />
          <button>
            <Search className="search-submit" />
          </button>
        </div>
        <div className="top-bar-brand">
          <Star className="second-nav-icon" />
          <p> Original Brand</p>
        </div>
        <div className="top-bar-brand">
          <Telegram className="second-nav-icon" />
          <p> Free Shipping</p>
        </div>
        <div className="top-bar-brand">
          <PetsRounded className="second-nav-icon" />
          <p> Original Product</p>
        </div>
      </div>
      {/* lastnav  navlinks  {renderclass()} */}
      <nav className="mynav">
        <div className="logo">
          <Link to="/">
            <h3>Bright C Web</h3>
          </Link>
        </div>
        <ul className={`navlinks ${moblinavopen}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Contact us</Link>
          </li>
          {userId ? (
            <>
              <li>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
              <li>{user?.username}</li>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </ul>

        <div className="main-nav-items-two">
          <Link to="/mycart" className="basket-cart">
            <ShoppingBasket className="basket" />
            <p> ({cartTotalQuantity})</p>
          </Link>
        </div>

        <div className="mymobil-icon" onClick={handlenavmobile}>
          <DragHandleRounded />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
