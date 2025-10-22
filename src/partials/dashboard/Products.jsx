import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProductModal from "./UpdateProductModal"; // 👈 make sure path matches
import apiEndPoints from "../../constant/apiEndPoint";
import { baseURL } from "../../utils";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch products from API (optional if backend connected)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!token || !user) navigate("/");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${baseURL}${apiEndPoints.allProducts}`); // your backend endpoint
        if (res.data.status) {
          setProducts(res.data.products || []);
          setLoading(false);
        } else {
          setProducts([]);
          setLoading(false);
        }
      } catch (error) {
        if (
          error.response.data.message == "Your account is not approved by admin yet"
        ) {
          setMessage(error.response.data.message);
          axios.defaults.headers.common["Authorization"] = "";
          // localStorage.removeItem("token");
          // navigate("/");
        }
        // console.log("error.response", error.response.data.message);
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.delete(`${baseURL}${apiEndPoints.deleteProduct(productId)}`);
      setProducts(products.filter((p) => p._id !== productId));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🧠 Handle Save (after editing)
  const handleUpdateProduct = (updatedProduct) => {
    const updatedList = products.map((p) =>
      p._id === updatedProduct._id ? updatedProduct : p
    );
    setProducts(updatedList);
    setShowEditModal(false);
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      {/* Header */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Product Inventory
        </h2>
      </header>

      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 text-left font-semibold">Item ID</th>
                <th className="p-2 text-left font-semibold">Name</th>
                <th className="p-2 text-center font-semibold">Price (₨)</th>
                <th className="p-2 text-center font-semibold">Quantity</th>
                <th className="p-2 text-center font-semibold">Added On</th>
                <th className="p-2 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Loading products...
                    {message && (
                      <div className="mt-2 text-red-500">
                        {message} or may be rejected.
                      </div>
                    )}
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No products found.
                    {message && (
                      <div className="mt-2 text-red-500">{message}</div>
                    )}
                  </td>
                </tr>
              )}

              {/* Product Rows */}
              {!loading &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                  >
                    <td className="p-2">{product.itemId}</td>
                    <td className="p-2 text-gray-800 dark:text-gray-100">
                      {product.name}
                    </td>
                    <td className="p-2 text-center text-green-500 font-medium">
                      {product.price.toLocaleString()}
                    </td>
                    <td className="p-2 text-center">{product.quantity}</td>
                    <td className="p-2 text-center text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>

                    {/* 🧠 Action Buttons */}
                    <td className="p-2 text-center flex justify-center gap-4">
                      {/* ✏️ Edit Icon */}
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit Product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.688 1.688a1.875 1.875 0 010 2.652l-8.482 8.482a4.5 4.5 0 01-1.591 1.04l-3.107.993a.75.75 0 01-.927-.927l.993-3.107a4.5 4.5 0 011.04-1.591l8.482-8.482a1.875 1.875 0 012.652 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 14v4.75A2.25 2.25 0 0115.75 21h-9A2.25 2.25 0 014.5 18.75v-9A2.25 2.25 0 016.75 7.5H11"
                          />
                        </svg>
                      </button>

                      {/* 🗑️ Delete Icon */}
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Product"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Update Product Modal */}
      {showEditModal && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default Products;
