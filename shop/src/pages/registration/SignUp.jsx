import React, { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loaders";
import { toast } from "react-toastify";
//Email
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/firebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
//Google
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const { loading, setLoading } = useContext(ProductContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const signUpUser = async () => {
    setLoading(true);
    const { name, email, password } = newUser;
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return toast.error("All fields are required");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        name: name,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        time: Timestamp.now(),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("SignUp Succesfully");
      setNewUser({
        name: "",
        email: "",
        password: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Successfully signed in with Google:", user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(`Google Sign-In Error:, ${error}`);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="  bg-gray-900 px-16 py-10 rounded-lg">
          <div className="">
            <h1 className="text-center text-blue-200 text-xl mb-4 font-bold">
              Signup
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center mb-3">
            <button
              className=" bg-red-500 w-full text-blue-200 font-bold  px-4 py-4 rounded-lg text-xl"
              onClick={signUpUser}
            >
              Signup
            </button>
            <button
              className="bg-blue-500 w-full text-white font-bold px-4 py-4 rounded-lg text-xl"
              onClick={handleGoogleSignIn}
            >
              Google
            </button>
          </div>
          <div>
            <h2 className="text-white">
              <span className="text-blue-200 ml-1">
                You already have an account
              </span>
              <Link
                className=" text-red-600 font-bold ml-3 text-xl"
                to={"/login"}
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
