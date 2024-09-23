import React, { useEffect, useState } from "react";
import Bubble from "../assets/images/Bubble1.png";

import Lock from "../assets/images/Lock.png";
import { FiMail } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import Bubble2 from "../assets/images/Bubble2.png";

import Bubble3 from "../assets/images/Bubble3.png";
import { MdLockOutline } from "react-icons/md";
import Or from "../assets/images/or.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCred } from "../components/redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  //   const dispatch = useDispatch();
  //   const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.userInfo);
  console.log(currentUser);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 90, // optional, defaults to 60
        }),
        // credentials: 'include' // Include cookies (e.g., accessToken) in the request
      });
      if (!res.ok) return "error";
      const data = await res.json();
      dispatch(setCred(data));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="flex flex-row  h-screen">
      <div className="w-[943px]  bg-[#f4f4f4] relative lg:flex hidden items-center justify-center overflow-hidden">
        <img src={Bubble} className="top-0 left-0 absolute" />

        <img
          src={Bubble2}
          className="absolute top-[40%] right-[25%] h-[213px] w-[300px]"
        />

        <img
          src={Bubble3}
          className="absolute bottom-[-15%] right-[0%] h-[213px] w-[300px]"
        />

        <img
          src={Lock}
          className="h-[600px]
        "
        />
      </div>

      <div className="w-[483px] bg-[#ffffff] px-12 my-auto mx-auto">
        <p className="text-[#555555] text-[16.6px] font-semibold text-center ">
          Login into your account{" "}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-[16.6px] text-[#555555]">Email id :</label>
            <div className="relative flex flex-row items-center h-[50px] rounded-md  bg-[#eeeeee]">
              <input
                type="username"
                required
                placeholder="info@provistechnologies.com"
                className="w-full  px-3 border-none outline-none  text-gray-500  bg-[#eeeeee]   rounded-lg"
                onChange={handleChange}
                name="username"
              />
              <div className="bg-[#1e2772] p-3 rounded-md absolute right-0">
                <FiMail className="text-white text-[24px]" />
              </div>
            </div>
          </div>
          <div>
            <label className=" text-[16.6px] text-[#555555]">Password</label>
            <div className="relative flex flex-row items-center h-[50px] rounded-md  bg-[#eeeeee]">
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full  px-3 border-none outline-none  text-gray-500  bg-[#eeeeee]   rounded-lg"
                onChange={handleChange}
                name="password"
              />
              <div className="bg-[#1e2772] p-3 rounded-md absolute right-0">
                <MdLockOutline className="text-white text-[24px]" />
              </div>
            </div>
          </div>

          <p className="text-[14.4px] text-[#1e2772] text-end underline pb-8">
            Forgot password
          </p>
    
            <button className="w-full px-4 h-[50px] text-[16.16px] text-white font-medium bg-[#1e2772] hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Login now
            </button>
      
          {error && <span>{error}</span>}
          <img src={Or} />
          <button className="w-full px-4 h-[50px] text-[16.16px] text-[#1e2772] font-medium bg-transparent border-[#1e2772] border rounded-lg duration-150">
            Signup now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
