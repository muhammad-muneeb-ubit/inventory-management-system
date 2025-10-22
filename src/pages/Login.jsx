import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../partials/Header";
import  {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseURL } from "../utils";
import apiEndPoints from "../constant/apiEndPoint";
import { loginSuccess } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {

  const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  })
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  //   useEffect(() => {
  //   // If already authenticated, redirect to dashboard
  //   const token = localStorage.getItem("token");
  //   if (token) navigate("/dashboard", { replace: true });
  // }, [navigate]);

  const onSubmit = async (data) => {
    // console.log(data);

    setMessage("");
    try {
      const res = await axios.post(`${baseURL}${apiEndPoints.login}`, data);
      if (res?.data?.status) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        dispatch(loginSuccess({ token: res.data.token, user: res.data.data }));
        setMessage("✅ Login successful!");
        reset();
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        setMessage("❌ " + (res.data.message || "Invalid credentials."));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Login error. Please try again.");
      // const serverMsg = error?.response?.data?.message;
      // setMessage("❌ " + (serverMsg || "Login error. Please try again."));
      // console.error("Login error:", error);
    }
  };

const { user, token } = useSelector((state) => state.auth);

console.log(user);
console.log(token);
  return (
    <>
      <Header auth = {false} />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Welcome Back
        </h2>

        {message && (
          <p className="text-center text-sm text-violet-600 dark:text-violet-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
            {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
              placeholder="you@example.com"
              autoComplete="email"
              />
              {errors.email &&  <p className="mt-1 text-xs text-red-500">
              {(errors.email && errors.email.message) ||
                `Use a valid email address.`}
            </p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              name="password"
              id="password"
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
              placeholder="Enter your password"
              />
              {errors.password &&  <p className="mt-1 text-xs text-red-500">
              {(errors.password && errors.password.message) ||
                `Password must be at least 8 characters.`}
            </p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
            >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-600 dark:text-violet-400 hover:underline"
            >
            Create one
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} HydraFoods - Inventory Management System - All rights reserved.
      </footer>
    </div>
            </>
  );
}

export default Login;
