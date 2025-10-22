import React, { useEffect, useState } from "react";
import axios from "axios";

import withDashboardLayout from "../../hocs/withDashboardLayout";
import { baseURL } from "../../utils";
import apiEndPoints from "../../constant/apiEndPoint";

function Reports() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalUsers: 0,
    approvedUsers: 0,
    pendingUsers: 0,
    rejectedUsers: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Report Data
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // Example endpoints — replace with your real backend routes
        const [lowStockRes, productRes] = await Promise.all([
        // const [statsRes, lowStockRes, productRes] = await Promise.all([
          // axios.get("/api/reports/summary"),
          axios.get(`${baseURL}${apiEndPoints.lowstockReport}`),
          axios.get(`${baseURL}${apiEndPoints.allProducts}`)
        ]);
        // console.log(" Report Stats:", statsRes.data);
        // console.log(" Low Stock Products:", lowStockRes.data);
        console.log(" Products:", productRes.data.products);
        let low = productRes.data.products.filter((p)=>{
          return p.quantity <=10
        }) 
        setLowStockProducts(low);
        setLoading(false)

        // if (statsRes.data.status) setStats(statsRes.data.data);
        if (lowStockRes.data.status) setLowStockProducts(lowStockRes.data.data);
      } catch (error) {
        console.error("Error loading report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Fallback mock data (if API not ready)
  useEffect(() => {
    if (loading === false) {
      setStats({
        totalProducts: 10,
        lowStock: 3,
        totalUsers: 8,
        approvedUsers: 5,
        pendingUsers: 2,
        rejectedUsers: 1,
      });

      setLowStockProducts([
         ]);
    }
  }, [loading]);


 const handleDownload = async () => {
      try {
        const response = await axios.get(
          `${baseURL}${apiEndPoints.lowstockReport}`,
          {
            responseType: "blob", // impoinvertant for binary files
          }
        );

        // Create blob link
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Create temporary download link
        const a = document.createElement("a");
        a.href = url;
        a.download = "HydraFoods_Low_Stock_Report.pdf"; // file name
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading report:", error);
        alert("Failed to download report!");
      }
    
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl p-6">
      <header className=" mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        <div className="flex items-center space-x-3 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 17v-2m4 2V9m4 8v-4M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Reports & Analytics
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of inventory, user activity, and stock status.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: "Total Products", value: stats.totalProducts },
          { label: "Low Stock", value: stats.lowStock },
          { label: "Total Users", value: stats.totalUsers },
          { label: "Approved", value: stats.approvedUsers },
          { label: "Pending", value: stats.pendingUsers },
          { label: "Rejected", value: stats.rejectedUsers },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-50 dark:bg-gray-900 shadow-sm rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-semibold text-violet-600">
              {item.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Products */}
      <div className="bg-gray-50 dark:bg-gray-900 shadow-sm rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          ⚠️ Low Stock Products
        </h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 text-left font-semibold">Item ID</th>
                <th className="p-2 text-left font-semibold">Name</th>
                <th className="p-2 text-center font-semibold">Quantity</th>
                <th className="p-2 text-center font-semibold">Price (₨)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {lowStockProducts.map((p) => (
                <tr key={p.itemId}>
                  <td className="p-2">{p.itemId}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2 text-center text-red-500 font-semibold">
                    {p.quantity}
                  </td>
                  <td className="p-2 text-center text-green-600">
                    {p.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              Loading low stock products...
            </div>
          )}

          {lowStockProducts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              All stocks are healthy ✅
            </p>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            className= "flex gap-2 items-center space-x-3 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg transition shadow-sm"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-8H8v8m8-14H8v4h8V7z"
            />
          </svg>
          
            Download Low Stock Report (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default withDashboardLayout(Reports);
