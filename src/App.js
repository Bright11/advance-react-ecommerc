import './App.css';
import {BrowserRouter as Router, Link, Route, Routes,useNavigate, Navigate, HashRouter } from 'react-router-dom'
import Navbar from './frontend/Navbar';
import AdminHome from './adminpages/AdminHome';
import AdminCategory from './adminpages/AdminCategory';
import Addproduct from './adminpages/Addproduct';
import { ToastContainer, toast } from 'react-toastify';
import Home from './frontend/Home';
import Cartpage from './frontend/Cartpage';
import MainShop from './frontend/mainshop/MainShop';
import ShopCategory from './frontend/mainshop/ShopCategory';
import Footer from './frontend/Footer';
import Admin_view_Category from './adminpages/Admin_view_Category';
import Login from './frontend/Login';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Details from './frontend/Details';
import Orders from './frontend/Orders';


function App() {
  //
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  //
 
  useEffect(() =>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    });
  },[]);

  const handleLogout = () =>{
    signOut(auth).then(() =>{
      setUser(null);
    // navigate('/login');
    });
  }
  return (
    <div className="app">
      <ToastContainer position="top-center" />
      <HashRouter>
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/order" element={<Orders />} />

          <Route path="/details/:details" element={<Details />} />
          <Route
            path="/login"
            element={user?.uid ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/admin_viewcat"
            element={
              user?.email === "chikanwazuo@gmail.com" ? (
                <Admin_view_Category />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/getcat/:cat" element={<ShopCategory />} />
          <Route path="/shop" element={<MainShop />} />
          <Route path="/mycart" element={<Cartpage />} />
          <Route
            path="/updatepro/:updatepro"
            element={
              user?.email === "chikanwazuo@gmail.com" ? (
                <Addproduct />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/addpro" element={<Addproduct />} />
          <Route
            path="/admin"
            element={
              user?.email === "chikanwazuo@gmail.com" ? (
                <AdminHome user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/update/:updatecat"
            element={
              user?.email === "chikanwazuo@gmail.com" ? (
                <AdminCategory />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/addcategory"
            element={
              user?.email === "chikanwazuo@gmail.com" ? (
                <AdminCategory />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
