import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cartsclice/cartSlice";
import { Favorite, ShoppingBasket } from "@material-ui/icons";

function ShopCategory() {
  const { cat } = useParams();
  const [shopcat, setShopcat] = useState([]);
  const [mycat, setMycat] = useState([]);
  useEffect(() => {
    const getCat = async () => {
      const categorys = collection(db, "products");
      const allact = query(categorys, where("category", "==", cat));
      const querySnapshot = await getDocs(allact);
      let shopcat = [];
      querySnapshot.forEach((doc) => {
        shopcat.push({ id: doc.id, ...doc.data() });
      });
      setShopcat(shopcat);
    };
    return () => {
      getCat();
    };
  }, [cat]);

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
  console.log("shopcat", shopcat);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddTocart = (item) => {
    dispatch(addToCart(item));
    navigate("/mycart");
  };

  return (
    <div className="shopCategory">
      <div className="myshop">
        <div className="mainshop">
          <div className="itemsinmainshop">
            {shopcat?.map((item) => (
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
        {/* <div className="mainshopsidebar">
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
        </div> */}
      </div>
    </div>
  );
}

export default ShopCategory;
