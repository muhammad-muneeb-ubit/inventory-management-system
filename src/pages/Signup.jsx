import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../partials/Header";
import  {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseURL } from "../utils";
import apiEndPoints from "../constant/apiEndPoint";

function Signup() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const schema = yup.object({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await axios.post(`${baseURL}${apiEndPoints.signup}`, data);
      console.log("response:", res);
      if (res.data.status) {
        setMessage("✅ Account created successfully!");
        reset();
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("❌ " + (res.data.message || "Signup failed."));
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Signup error. Please try again.");
    } 
  };

  return (
 <>  
       <Header auth = {false} />  
       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Create an Account
        </h2>

        {message && (
          <p className="text-center text-sm text-violet-600 dark:text-violet-400 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              name="name"              
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>  

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Footer */}
          <footer className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} HydraFoods - Inventory Management System - All rights reserved.
      </footer>
    </div></>
  );
}

export default Signup;
