import React, { useEffect, useState } from "react";
import axios from "axios";
import withDashboardLayout from "../../hocs/withDashboardLayout";
import apiEndPoints from "../../constant/apiEndPoint";
import { baseURL } from "../../utils";

function DashboardCardUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // ✅ Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}${apiEndPoints.pendingUsers}`);
          if (res.data.status) {
          setUsers(res.data.users || []);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}${apiEndPoints.deleteUser(id)}`);
      setUsers(users.filter((u) => u._id !== id));

    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };


  // 🎨 Helper: badge colors for status
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400";
    }
  };

  // 🎨 Helper: badge colors for role
  const getRoleColor = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400"
      : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400";
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      {/* Header */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          User Management - Pending / Rejected Users
        </h2>
      </header>

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 text-left font-semibold">Name</th>
                <th className="p-2 text-left font-semibold">Email</th>
                <th className="p-2 text-center font-semibold">Role</th>
                <th className="p-2 text-center font-semibold">Status</th>
                {/* <th className="p-2 text-center font-semibold">Actions</th> */}
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    Loading users...
                  </td>
                </tr>
              )}

              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-400 dark:text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}

              {!loading &&
                users.filter((user) => user.status === "pending" || user.status === "rejected").map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                  >
                    <td className="p-2 whitespace-nowrap text-gray-800 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="p-2 whitespace-nowrap">{user.email}</td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                  
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withDashboardLayout(DashboardCardUsers);
