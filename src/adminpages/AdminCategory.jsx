import "./AdminCategory.css";
import Adminsidbar from "./Adminsidbar";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  cat_name: "",
};
function AdminCategory() {
  const [form, setForm] = useState(initialState);
  const { updatecat } = useParams();
  const { cat_name } = form;
  const navigate = useNavigate();
  //getting cat id for editting it
  useEffect(() => {
    updatecat && getcatdetails();
  }, [updatecat]);

  const getcatdetails = async () => {
    const docRef = doc(db, "category", updatecat);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };
  console.log("update", form);

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleinsertcat = async (e) => {
    e.preventDefault();
    if (updatecat) {
      try {
        await updateDoc(doc(db, "category", updatecat), {
          ...form,
          timestamp: serverTimestamp(),
        });
        navigate("/admin_viewcat");
        return toast.success("Category updated");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addDoc(collection(db, "category"), {
          ...form,
          timestamp: serverTimestamp(),
        });
        navigate("/admin_viewcat");
        return toast.success("Category added successfully");
      } catch (error) {
        //console.log(error);
        return toast.error(`Erroe ${error}`);
      }
    }
  };

  //console.log("getcat", getcat);
  return (
    <div className="Category">
      <div className="admin-side-bar">
        <Adminsidbar />
      </div>
      <div className="admin-main-content">
        <div className="addcategory-dive">
          <form onSubmit={handleinsertcat}>
            <input
              type="text"
              placeholder="category name"
              name="cat_name"
              value={cat_name}
              onChange={handlechange}
            />
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;
