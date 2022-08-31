import "./AdminCategory.css";
import Adminsidbar from "./Adminsidbar";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Admin_view_Category() {
  const [getcat, setGetcat] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "category"),
      (snapshot) => {
        let admincat = [];
        snapshot.docs.forEach((doc) => {
          admincat.push({ id: doc.id, ...doc.data() });
        });
        setGetcat(admincat);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  //console.log("getcat", getcat);
  return (
    <div className="Category">
      <div className="admin-side-bar">
        <Adminsidbar />
      </div>
      <div className="admin-main-content">
        <div className="pagename">
          <p>All category</p>
          <p>
            <Link to="/addcategory">Add category</Link>
          </p>
        </div>
        <div className="admin-category-display">
          <div className="cart-admin">
            <p>Category name</p>
            <p>Date</p>
            <p>Action</p>
          </div>
          {getcat.map((item) => (
            <div className="cat-admin-down-table" key={item.id}>
              <p>{item.cat_name}</p>
              <p className="date">{item.timestamp.toDate().toDateString()}</p>
              <p className="delete">
                <button>
                  <Link to={`/update/${item.id}`}>Update</Link>
                </button>
                <button>Delete</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin_view_Category;
