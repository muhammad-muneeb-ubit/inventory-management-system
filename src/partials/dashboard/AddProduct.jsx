import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withDashboardLayout from "../../hocs/withDashboardLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseURL } from "../../utils";
import apiEndPoints from "../../constant/apiEndPoint";

function AddProduct() {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    price: yup
      .number()
      .min(1, "Price must be positive")
      .required("Price is required"),
    quantity: yup
      .number()
      .min(1, "Quantity must be positive")
      .required("Quantity is required"),
    itemId: yup.string().required("Item ID is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    itemId: "",
  });

  const [message, setMessage] = useState("");

  // Handle Form Submission
  const onSubmit = async (data) => {
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${baseURL}${apiEndPoints.createProduct}`,
        data
      );

      if (res.data.status) {
        setMessage("✅ Product added successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage("❌ " + res.data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding product.");
    } finally {
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        ➕ Add New Product
      </h2>

      {message && (
        <div className="mb-4 text-sm text-center text-violet-600 dark:text-violet-400">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            required
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {(errors.name && errors.name.message) ||
                `Use a valid product name.`}
            </p>
          )}
        </div>

        {/* Item ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Item ID
          </label>
          <input
            {...register("itemId")}
            type="text"
            name="itemId"
            required
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
            placeholder="Enter unique Item ID"
          />
          {errors.itemId && (
            <p className="mt-1 text-xs text-red-500">
              {(errors.itemId && errors.itemId.message) ||
                `Use a valid item ID.`}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price (₨)
          </label>
          <input
            {...register("price")}
            type="number"
            name="price"
            required
            min="1"
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
            placeholder="Enter price in PKR"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">
              {errors.price && `Use a valid price.`}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity
          </label>
          <input
            {...register("quantity")}
            type="number"
            name="quantity"
            required
            min="1"
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
            placeholder="Enter available quantity"
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-500">
              {errors.quantity && `Use a valid quantity.`}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 p-2"
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default withDashboardLayout(AddProduct);
