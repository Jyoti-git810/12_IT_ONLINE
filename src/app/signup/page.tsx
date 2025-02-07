"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onButtonClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setLoading(true);
    const { name, email, password } = inputValue;
    if (!email || !password || !name) {
      setErrorMsg("Field is empty");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Email address is invalid");
      return;
    }
    axios
      .post("/api/user/signup", {
        ...inputValue,
      })
      .then((res) => {
        toast(res.data.message);
        router.push("/login");
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <Image width={450} height={450} src="/assest/signup2.png" alt="" />
      <div className="flex flex-col justify-center w-40 h-1/3 p-8 ml-28 shadow-box-shadow">
        <h1 className="text-lg text-center">Register</h1>
        <div className="flex flex-col items-center p-8">
          <input
            type="text"
            name="Name"
            id=""
            placeholder="Name"
            value={inputValue.name}
            className="p-2 mb-4 w-full"
            required
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <p className="text-red-700 text-left">
            {!inputValue.name && errorMsg ? errorMsg : ""}
          </p>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            value={inputValue.email}
            className="p-2 mb-4 w-full"
            required
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <p className="text-red-700 text-left">
            {!inputValue.email && errorMsg ? errorMsg : ""}
          </p>
          <input
            type="password"
            name="password"
            id=""
            value={inputValue.password}
            placeholder="password"
            className="p-2 mb-4 w-full"
            required
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <p className="text-red-700 text-left">
            {!inputValue.password && errorMsg ? errorMsg : ""}
          </p>
          <button
            type="submit"
            className="bg-35a4b9 w-35 text-white py-2 rounded-full my-4"
            onClick={() => onButtonClick()}
          >
            Register
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
