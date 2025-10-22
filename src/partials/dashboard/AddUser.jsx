import React, { useState } from "react";
import axios from "axios";
import withDashboardLayout from "../../hocs/withDashboardLayout";
import  {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { baseURL } from "../../utils";
import apiEndPoints from "../../constant/apiEndPoint";


function AddUser() {
 
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate("/dashboard/users");
  const onSubmit = async (data) => {
    setAlert({ type: "", message: "" });

    try {
      const res = await axios.post(`${baseURL}${apiEndPoints.createUser}`, data);




      if (res.data.status) {
        setAlert({ type: "success", message: "User added successfully!" });
        reset();
        navigate("/dashboard/users");
      } else {
        setAlert({ type: "error", message: res.data.message || "Failed to add user." });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Something went wrong.",
      });
    } 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      {/* Header */}
      <header   className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Add New User
        </h2>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Fill the form below to register a new user.
        </p>
      </header>

      {/* Alert */}
      {alert.message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            alert.type === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-300"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
          {...register("name", { required: "Name is required" })}
            type="text"
            name="name"
            required
            placeholder="Enter full name"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-violet-500 focus:border-violet-500 p-2"
          />
          {errors.name &&  <p className="mt-1 text-xs text-red-500">
              {(errors.name && errors.name.message) ||
                `Name is required.`}
            </p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
          {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            required
            placeholder="user@example.com"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-violet-500 focus:border-violet-500 p-2"
          />
          {errors.email &&  <p className="mt-1 text-xs text-red-500">
              {(errors.email && errors.email.message) ||
                `Use a valid email address.`}
            </p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
          {...register("password", { required: "Password is required" })}
            type="password"
            name="password"
            required
            placeholder="Enter password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-violet-500 focus:border-violet-500 p-2"
          />
          {
            errors.password &&  <p className="mt-1 text-xs text-red-500">
              {(errors.password && errors.password.message) ||
                `Password must be at least 8 characters.`}
            </p>
          }
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            {...register("role", { required: "Role is required" })}
            name="role"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-violet-500 focus:border-violet-500 p-2"
          >
            <option value="user" defaultValue={true}>User</option>
            <option value="admin">Admin</option>
          </select> 
          {errors.role &&  <p className="mt-1 text-xs text-red-500">
              {(errors.role && errors.role.message) ||
                `Role is required.`}
            </p>}

        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Account Status
          </label>
          <select
            {...register("status", { required: "Status is required" })}
            name="status"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-violet-500 focus:border-violet-500 p-2"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.status &&  <p className="mt-1 text-xs text-red-500">
              {(errors.status && errors.status.message) ||
                `Status is required.`}
            </p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 px-4 rounded-md font-medium transition disabled:opacity-50"
          >
            {isSubmitting ? "Adding User..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default withDashboardLayout(AddUser);
