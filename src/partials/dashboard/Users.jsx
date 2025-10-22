// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import withDashboardLayout from "../../hocs/withDashboardLayout";
// import UpdateUserModal from "./UpdateUserModal"; // 👈 import modal
// import apiEndPoints from "../../constant/apiEndPoint";
// import { baseURL } from "../../utils";
// import { set } from "react-hook-form";

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const token = localStorage.getItem("token");
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   // ✅ Fetch users (optional backend connection)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(`${baseURL}${apiEndPoints.allUsers}`);
//         if (res.data.status) setUsers(res.data.users || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // 🧠 Handle Save (after editing)
//   const handleUpdateUser = (updatedUser) => {
//     const updatedList = users.map((u) =>
//       u._id === updatedUser._id ? updatedUser : u
//     );
//     setUsers(updatedList);
//     setShowEditModal(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`${baseURL}${apiEndPoints.deleteUser(id)}`);
//       setUsers(users.filter((u) => u._id !== id));

//     } catch (error) {
//       console.error("Error deleting user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🎨 Badge Colors
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400";
//       case "rejected":
//         return "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400";
//       default:
//         return "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400";
//     }
//   };

//   const getRoleColor = (role) => {
//     return role === "admin"
//       ? "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400"
//       : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400";
//   };

//   return (
//     <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
//       {/* Header */}
//       <header  className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
//         <h2 className="font-semibold text-gray-800 dark:text-gray-100">
//           User Management
//         </h2>
//       </header>

//       <div className="p-3">
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full dark:text-gray-300">
//             <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
//               <tr>
//                 <th className="p-2 text-left font-semibold">Name</th>
//                 <th className="p-2 text-left font-semibold">Email</th>
//                 <th className="p-2 text-center font-semibold">Role</th>
//                 <th className="p-2 text-center font-semibold">Status</th>
//                 <th className="p-2 text-center font-semibold">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
//               {loading && (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="text-center py-4 text-gray-500 dark:text-gray-400"
//                   >
//                     Loading users...
//                   </td>
//                 </tr>
//               )}

//               {!loading && users.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="text-center py-4 text-gray-400 dark:text-gray-500"
//                   >
//                     No users found.
//                   </td>
//                 </tr>
//               )}

//               {!loading &&
//                 users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
//                   >
//                     <td className="p-2 whitespace-nowrap text-gray-800 dark:text-gray-100">
//                       {user.name}
//                     </td>
//                     <td className="p-2 whitespace-nowrap">{user.email}</td>
//                     <td className="p-2 whitespace-nowrap text-center">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(
//                           user.role
//                         )}`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="p-2 whitespace-nowrap text-center">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
//                           user.status
//                         )}`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>

//                     {/* 🧠 Actions */}
//                     <td className="p-2 text-center flex justify-center gap-4">
//                       {/* ✏️ Edit Icon */}
//                       <button
//                         onClick={() => {
//                           setSelectedUser(user);
//                           setShowEditModal(true);
//                         }}
//                         className="text-blue-500 hover:text-blue-700 transition"
//                         title="Edit User"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.8}
//                           stroke="currentColor"
//                           className="w-5 h-5"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M16.862 4.487l1.688 1.688a1.875 1.875 0 010 2.652l-8.482 8.482a4.5 4.5 0 01-1.591 1.04l-3.107.993a.75.75 0 01-.927-.927l.993-3.107a4.5 4.5 0 011.04-1.591l8.482-8.482a1.875 1.875 0 012.652 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M18 14v4.75A2.25 2.25 0 0115.75 21h-9A2.25 2.25 0 014.5 18.75v-9A2.25 2.25 0 016.75 7.5H11"
//                           />
//                         </svg>
//                       </button>

//                       {/* 🗑️ Delete Icon */}
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="text-red-500 hover:text-red-700 transition"
//                         title="Delete User"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.8}
//                           stroke="currentColor"
//                           className="w-5 h-5"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ✅ Update User Modal */}
//       {showEditModal && (
//         <UpdateUserModal
//           user={selectedUser}
//           onClose={() => setShowEditModal(false)}
//           onSave={handleUpdateUser}
//         />
//       )}
//     </div>
//   );
// }

// export default withDashboardLayout(Users);

import React, { useEffect, useState } from "react";
import axios from "axios";
import withDashboardLayout from "../../hocs/withDashboardLayout";
import apiEndPoints from "../../constant/apiEndPoint";
import { baseURL } from "../../utils";
import UpdateUserModal from "./UpdateUserModal";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  
  const navigate = useNavigate();
  // ✅ Attach token
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  if (!token || !user) navigate("/");

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}${apiEndPoints.allUsers}`);
        if (res.data.status) setUsers(res.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateUser = async (updatedUser) => {
    try {
      const res = await axios.put(
        `${baseURL}${apiEndPoints.updateUser(updatedUser._id)}`,
        updatedUser
      );
      if (res.data.status) {
        const updatedList = users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
        setUsers(updatedList);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setShowEditModal(false);
    }
  };

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
  // 🧠 Change Role
  const handleRoleChange = async (id) => {
    try {
      const res = await axios.get(`${baseURL}${apiEndPoints.changeRole(id)}`);
      if (res.data.status) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: res.data.user.role } : u
          )
        );
      }
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  // 🪟 Open Modal for Status Change
  const openStatusModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setStatusModalOpen(true);
  };

  // 🧠 Handle Status Update
  const handleStatusChange = async () => {
    if (!selectedUser) return;
    const id = selectedUser._id;

    try {
      if (newStatus === "approved") {
        await axios.patch(`${baseURL}${apiEndPoints.approveUser(id)}`);
      } else if (newStatus === "rejected") {
        await axios.patch(`${baseURL}${apiEndPoints.rejectUser(id)}`);
      } else {
        // optional pending handler
        await axios.put(`${baseURL}${apiEndPoints.updateUser(id)}`, {
          status: "pending",
        });
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
      setStatusModalOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // 🎨 Badge Colors
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

  const getRoleColor = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400"
      : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400";
  };

  return (
    <>
    {user && (<div className="col-span-full xl:col-span-6 bg-white/30 dark:bg-gray-800/30 shadow-xs rounded-xl backdrop-blur-md border border-white/30 dark:border-gray-700/30">
      {/* Header */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          User Management
        </h2>
      </header>

      <div className="p-3 overflow-x-auto">
        <table className="table-auto w-full dark:text-gray-300">
          <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50/60 dark:bg-gray-700/50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-center">Role</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="p-2 text-gray-800 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="p-2">{user.email}</td>

                  <td
                    className="p-2 whitespace-nowrap text-center cursor-pointer"
                    onClick={() => handleRoleChange(user._id)}
                    title="Click to change role"
                  >
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td
                    className="p-2 whitespace-nowrap text-center cursor-pointer"
                    title="Click to change status"
                    onClick={() => openStatusModal(user)}
                  >
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-2 text-center flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Edit User"
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
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete User"
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔘 Status Modal */}
      {statusModalOpen && (
        <div className="fixed m-auto rounded-2xl w-full inset-0 bg-gray-300/40 dark:bg-gray-900/40 backdrop-blur-xl flex justify-center items-center">
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-6 w-80 shadow-lg backdrop-blur-3xl border border-white/30 dark:border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Change User Status
            </h3>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 mb-4 dark:bg-gray-900 dark:text-gray-100"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-3 py-1 bg-gray-200/70 dark:bg-gray-700/70 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={!newStatus || newStatus === selectedUser?.status}
                className="px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateUser}
        />
      )}
    </div>)}
    </>

  );
}

export default withDashboardLayout(Users);
