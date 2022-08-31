import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import "./Addproduct.css";
import Adminsidbar from "./Adminsidbar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const initialState = {
  product_name: "",
  price: "",
  category: "",
  keywords: "",
  description: "",
};
function Addproduct() {
  //getting category
  const [mycat, setMycat] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProduct] = useState();
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const { updatepro } = useParams();
  const { product_name, price, category, keywords, description } = form;
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "category"),
      (snapshot) => {
        let cats = [];
        snapshot.docs.forEach((doc) => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        setMycat(cats);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  // for inserting data and image
  useEffect(() => {
    //upload image
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is runing");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, image: downloadUrl }));
          });
          return toast.info("Image uploaded succesfully");
        }
      );
    };
    file && uploadFile();
  }, [file]);
  //the end of image upload

  //upload items
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handlecategory = (e) => {
    setForm({ ...form, category: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (product_name && price && category && keywords && description) {
      if (updatepro) {
        try {
          await updateDoc(doc(db, "products", updatepro), {
            ...form,
            timestamp: serverTimestamp(),
          });
          navigate("/admin");
          return toast.success("Product updated");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addDoc(collection(db, "products"), {
            ...form,
            timestamp: serverTimestamp(),
          });
          navigate("/admin");
          return toast.success("Product uploaded successfully");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("All forms must be file");
    }
  };

  //products to update getting it
  useEffect(() => {
    updatepro && getupdatepro();
  }, [updatepro]);
  const getupdatepro = async () => {
    const docRef = doc(db, "products", updatepro);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  //the end

  return (
    <div className="addproduct">
      <div className="admin-side-bar">
        <Adminsidbar />
      </div>
      <div className="admin-main-content">
        <div className="addproduct-form">
          <form onSubmit={handlesubmit}>
            <div className="form-inputs-products">
              <div className="input-holder">
                <input
                  type="text"
                  placeholder="Product name"
                  name="product_name"
                  value={product_name}
                  onChange={handlechange}
                />
                <input
                  type="text"
                  placeholder="Product price"
                  name="price"
                  value={price}
                  onChange={handlechange}
                />

                <textarea
                  rows="10"
                  cols="30"
                  placeholder="keywords"
                  name="keywords"
                  value={keywords}
                  onChange={handlechange}
                ></textarea>
              </div>
              <div className="input-holder">
                <select value={category} onChange={handlecategory}>
                  <option selected>Select Category</option>
                  {mycat?.map((option) => (
                    <option value={option.cat_name || ""} key={option.id}>
                      {option.cat_name}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <textarea
                  rows="10"
                  cols="30"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handlechange}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={progress !== null && progress < 100}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
