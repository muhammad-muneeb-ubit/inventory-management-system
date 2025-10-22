import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseURL } from "../../utils";
import apiEndPoints from "../../constant/apiEndPoint";
import { set } from "date-fns/set";
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function EditUserInfo({ onClose }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const schema = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    role: yup.string().trim().required("Role is required"),
    status: yup.string().trim().required("Status is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      status: user.status || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      //   let token = localStorage.getItem("token");
      // console.log("User data to save:", data, token, user._id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(`${baseURL}${apiEndPoints.updateUser(user._id)}`, data);
    //   console.log("Update response:", res.data);
      dispatch(loginSuccess({ user: {...res.data.user}, token }));
      // console.log("redux:", user);
      onClose(false);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
              1.414L11.414 10l4.293 4.293a1 1 0 
              01-1.414 1.414L10 11.414l-4.293 
              4.293a1 1 0 
              01-1.414-1.414L8.586 10 4.293 
              5.707a1 1 0 
              010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name")}
              name="name"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              {...register("role")}
              type="text"
              name="role"
              disabled={true}
              className="cursor-not-allowed w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 ">Status</label>
            <input
              {...register("status")}
              name="status"
              disabled={true}
              className="cursor-not-allowed w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserInfo;
