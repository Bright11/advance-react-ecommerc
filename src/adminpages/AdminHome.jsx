import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import Adminsidbar from "./Adminsidbar";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
function AdminHome({ user, handleLogout }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let pro = [];
        snapshot.docs.forEach((doc) => {
          pro.push({ id: doc.id, ...doc.data() });
        });
        setProduct(pro);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log("prodcut", product);
  return (
    <div className="adminHome">
      <div className="admin-side-bar">
        <Adminsidbar user={user} />
      </div>
      <div className="admin-main-content">
        <div className="admin-view-product-top">
          <p>Product name</p>
          <p>Image</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {product?.map((item) => (
          <div className="admin-view-product-down" key={item.id}>
            <p>{item.product_name}</p>
            <img src={item.image} alt="" />
            <p className="price">${item.price}</p>
            <p className="pro-update">
              <button>
                <Link to={`/updatepro/${item.id}`}>updatepro</Link>
              </button>
              <button>Delete</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
