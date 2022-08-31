import React, { useEffect, useState } from "react";
import "./MainShop.css";
import { doc, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Favorite, ShoppingBasket } from "@material-ui/icons";
import { addToCart } from "../../cartsclice/cartSlice";
import { useDispatch } from "react-redux/es/exports";

function MainShop() {
  const [product, setProduct] = useState([]);
  const [mycat, setMycat] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let pro = [];
        let mycat = [];
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
    //category
  }, []);

  useEffect(() => {
    const cat = onSnapshot(
      collection(db, "category"),
      (snapshot) => {
        let allcat = [];
        snapshot.docs.forEach((doc) => {
          allcat.push({ id: doc.id, ...doc.data() });
        });
        setMycat(allcat);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      cat();
    };
  }, []);
  //console.log("product", product);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddTocart = (item) => {
    dispatch(addToCart(item));
    navigate("/mycart");
  };
  return (
    <div className="mainShop">
      <div className="myshop">
        <div className="mainshop">
          <div className="itemsinmainshop">
            {product?.map((item) => (
              <div className="home-items-holder" key={item.id}>
                <Link to={`/details/${item.id}`}>
                  <img src={item.image} alt="" />
                  <p className="quick-view">
                    <Favorite className="view-icon" />
                    Quick View
                  </p>
                </Link>
                <h1>{item.product_name}</h1>
                <p className="price">Price&nbsp;${item.price}</p>

                <button
                  type="submit"
                  className="add-to-cat"
                  onClick={() => handleAddTocart(item)}
                >
                  <ShoppingBasket className="basket" />
                  Add to cat
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mainshopsidebar">
          <div className="shope-sidbar">
            <h1>Categories</h1>
            <div className="category">
              {mycat?.map((cats) => (
                <div className="mycategory" key={cats.id}>
                  <Link to={`/getcat/${cats.cat_name}`}>
                    <p>{cats.cat_name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainShop;
