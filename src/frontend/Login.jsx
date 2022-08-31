import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const initialState = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirmp: "",
};
function Login() {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [register, setRegister] = useState(false);

  const { username, fullname, email, password, confirmp } = form;
  const naviget = useNavigate();
  //   const [profile, setProfile] = useState(null);
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("opload is" + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upolad is paused");
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
            setForm((prev) => ({ ...prev, profile: downloadUrl }));
            // setProfile(profile);
            return toast.success("profile uploaded successfully");
          });
          return toast.info("upload is runing please wait");
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handlechang = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleregister = async (e) => {
    e.preventDefault();
    if (!register) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Successully logged in");
        naviget("/");
      } else {
        toast.error("file the form before logging in");
      }
    } else {
      if (username && fullname && email && password && password && confirmp) {
        if (password !== confirmp) {
          toast.error("Password did not martch");
        } else {
          //   const { user } = await createUserWithEmailAndPassword(
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          //   await setDoc(doc(db, "users", user.uid), {
          //     setForm(form );
          //     timeStamp: serverTimestamp(),
          //   });
          //   await updateProfile(user, {
          await updateProfile(user, { username: `${username}` });
          //   });
          toast.success("success registered");
          naviget("/");
        }
      } else {
        toast.error("Most forms are empty");
      }
    }
  };
  return (
    <div className="login">
      <div className="login-forms">
        <form className="login-inputs" onSubmit={handleregister}>
          {!register ? (
            <>
              <label>Email</label>
              <input
                type="email"
                className="login_inputs"
                name="email"
                value={email}
                onChange={handlechang}
                placeholder="Full name"
              />

              <label>Password</label>
              <input
                type="password"
                className="login_inputs"
                placeholder="Password...."
                name="password"
                value={password}
                onChange={handlechang}
              />
              <button type="submit">Login</button>
            </>
          ) : (
            <>
              <label>User name</label>
              <input
                type="text"
                className="login_inputs"
                name="username"
                value={username}
                onChange={handlechang}
                placeholder="User name"
              />
              <label>Full name</label>
              <input
                type="text"
                className="login_inputs"
                name="fullname"
                value={fullname}
                onChange={handlechang}
                placeholder="Full name"
              />
              <label>Email</label>
              <input
                type="email"
                className="login_inputs"
                name="email"
                value={email}
                onChange={handlechang}
                placeholder="Full name"
              />

              <label>Profile picture</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="login_inputs"
              />
              <label>Password</label>
              <input
                type="password"
                className="login_inputs"
                placeholder="Password...."
                name="password"
                value={password}
                onChange={handlechang}
              />
              <label>Confirm Password</label>
              <input
                type="password"
                className="login_inputs"
                placeholder="Confirm Password...."
                name="confirmp"
                value={confirmp}
                onChange={handlechang}
              />
              <button
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                Register
              </button>
            </>
          )}
        </form>
        {!register ? (
          <>
            <p onClick={() => setRegister(true)}>Register</p>
          </>
        ) : (
          <>
            <p onClick={() => setRegister(false)}>Login</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
