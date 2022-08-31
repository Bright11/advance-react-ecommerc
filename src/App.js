import './App.css';
import {BrowserRouter as Router, Link, Route, Routes,useNavigate, Navigate } from 'react-router-dom'
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
    <ToastContainer position='top-center'/>
    <Router>
    <Navbar user={user}  handleLogout={handleLogout}/>
    <Routes>
      <Route path='/details/:details' element={<Details/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin_viewcat' element={<Admin_view_Category/>}/>
    <Route path='/getcat/:cat' element={<ShopCategory/>}/>
    <Route path='/shop' element={<MainShop/>}/>
      <Route path='/mycart' element={<Cartpage/>}/>
      <Route path='/updatepro/:updatepro' element={<Addproduct/>}/>
    <Route path='/addpro' element={<Addproduct/>}/>
    <Route path='/admin' element={user?.email ==="chikanwazuo@gmail.com"? <AdminHome user={user} handleLogout={handleLogout}/>:<Navigate to="/"/>}/>
    <Route path='/update/:updatecat' element={<AdminCategory/>}/>
    <Route path='/addcategory' element={<AdminCategory/>}/>
    <Route path='/' element={<Home/>}/>
    </Routes>
    <Footer/>
    </Router>
   </div>
  );
}

export default App;
