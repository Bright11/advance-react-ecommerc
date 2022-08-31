import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import "./Home.css";
// import { addToCart } from "../cartsclice/cartSlice";
import { addToCart } from "../cartsclice/cartSlice";
import { Favorite, ShoppingBasket } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
function Home() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProduct(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
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
    <div className="home">
      <div className="home-product">
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
  );
}

export default Home;
