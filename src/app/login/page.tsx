"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/slices/user";

const Login = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const onButtonClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password } = value;
    if (!email || !password) {
      setErrorMsg("Field is empty");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Email address is invalid");
      return;
    }
    axios
      .post("/api/user/login", {
        ...value,
      })
      .then((res) => {
        if (res.data.status !== 200) {
          toast.error(res.data.message);
          return;
        }
        dispatch(setUser(res.data.user));
        router.replace("/");
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <Image width={450} height={450} src="/assest/signup2.png" alt="" />
      <div className="flex flex-col justify-center shadow w-40 h-1/3 p-8 ml-28">
        <h1 className="text-lg text-center">Login</h1>
        <div className="flex flex-col items-center p-8">
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            className="p-2 mb-4 w-full"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            className="p-2 mb-4 w-full"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            type="submit"
            onClick={() => onButtonClick()}
            className="bg-35a4b9 w-35 text-white py-2 rounded-full my-4"
          >
            Login
          </button>

          <button onClick={() => router.push("/signup")}>
            I don't have an account
          </button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
