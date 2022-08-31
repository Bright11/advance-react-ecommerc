import "./Details.css";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { addToCart } from "../cartsclice/cartSlice";
import { useDispatch } from "react-redux";
import { ShoppingBasket } from "@material-ui/icons";

function Details() {
  const [alldetails, setAlldetails] = useState([]);
  const { details } = useParams();

  useEffect(() => {
    details && getdetails();
  }, [details]);

  const getdetails = async () => {
    const docRef = doc(db, "products", details);
    const itemdetail = await getDoc(docRef);
    setAlldetails(itemdetail.data());
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddTocart = (alldetails) => {
    dispatch(addToCart(alldetails));
    navigate("/mycart");
  };
  return (
    <div className="details">
      <div className="details-divid">
        <div className="details-img-path">
          <img src={alldetails?.image} alt="" />
        </div>
        <div className="details-info">
          <h>Product information</h>
          <hr />
          <h1>{alldetails?.product_name}</h1>
          <hr />
          <p>${alldetails?.price}</p>
          <hr />

          <button
            type="submit"
            className="add-to-cats"
            onClick={() => handleAddTocart(alldetails)}
          >
            <ShoppingBasket className="basket" />
            Add to cat
          </button>
          <hr />
          <p>{alldetails?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
