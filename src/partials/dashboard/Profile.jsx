// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import withDashboardLayout from "../../hocs/withDashboardLayout";
// import { logout } from "../../utils/logout";
// import { useSelector, useDispatch } from "react-redux";
// import { loginSuccess, logoutRedux } from "../../store/slices/authSlice";
// import EditUserInfo from "./editUserInfo";

// function Profile() {
//   const [userObj, setUserObj] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [message, setMessage] = useState("");
//   const [showEditModal, setShowEditModal] = useState(false);

//   const dispatch = useDispatch();

//   const { user, token  } = useSelector((state) => state.auth);
//   console.log("from redux ",user, token)
//   // ✅ Fetch user info (from API or localStorage)
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUserObj(user);
//       setFormData(user);
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Handle input changes
//   // const handleChange = (e) => {
//   //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   // };
//   // const refreshUserData = () => {
//   //   // Re-fetch from localStorage or Redux
//   //   const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
//   //   setUserObj(updatedUser);
//   // };

//   // ✅ Handle profile update
//   const handleSave = async () => {
//     try {
//       const res = await axios.put(`/api/users/${user._id}`, formData);
//       if (res.data.status) {
//         setUserObj(res.data.data);
//         // localStorage.setItem("user", JSON.stringify(res.data.data));
//         setMessage("Profile updated successfully!");
//         setEditMode(false);
//         setTimeout(() => setMessage(""), 3000);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setMessage("Error updating profile.");
//     }
//   };

//   // ✅ Logout

//   const handleLogout = () => {
//     logout();
//     dispatch(logoutRedux());
//   };
//   // console.log(user);
//   // console.log(token);

//   if (loading)
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-400 py-10">
//         Loading profile...
//       </div>
//     );

//   return (
//     <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-6">
//       {/* Header */}
//       <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-8 h-8 shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1.5"
//               d="M5.121 17.804A9.003 9.003 0 0112 15a9.003 9.003 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//           <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//             My Profile
//           </h2>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Logout
//         </button>
//       </header>

//       {message && (
//         <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
//           {message}
//         </div>
//       )}

//       {/* Personal Info */}
//       <div className="flex flex-col sm:flex-row gap-8">
//         {/* Avatar Section */}
//         <div className="flex flex-col items-center sm:w-1/3">
//           <img
//             src={`https://ui-avatars.com/api/?name=${user.name}&background=8b5cf6&color=fff`}
//             alt="Profile"
//             className="w-28 h-28 rounded-full border-4 border-violet-500 shadow-sm"
//           />
//           <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
//             {user.name}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {user.email}
//           </p>
//           <div className="mt-2">
//             <span
//               className={`text-xs px-3 py-1 rounded-full font-medium ${
//                 user.role === "admin"
//                   ? "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400"
//                   : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400"
//               }`}
//             >
//               {user.role}
//             </span>
//           </div>
//         </div>

//         {/* Editable Fields */}
//         <div className="flex-1 space-y-5">
//           <div>
//             <label className="block text-sm text-gray-500 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name || ""}
//               // onChange={handleChange}
//               disabled={true}
//               className={`w-full px-3 py-2 rounded-lg border text-gray-800 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700 ${
//                 showEditModal ? "border-violet-500" : "border-gray-300"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">Email</label>
//             <input
//               type="email"
//               value={formData.email || ""}
//               disabled
//               className="w-full px-3 py-2 rounded-lg border text-gray-800 dark:text-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">Status</label>
//             <span
//               className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                 user.status === "approved"
//                   ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
//                   : user.status === "pending"
//                   ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
//                   : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
//               }`}
//             >
//               {user.status}
//             </span>
//           </div>

//           <div>
//             <label className="block text-sm text-gray-500 mb-1">
//               Account Created
//             </label>
//             <p className="text-gray-700 dark:text-gray-300">
//               {/* {new Date(user.createdAt).toLocaleString()} */}
//               {new Date("2025-10-04T19:16:56.266+00:00").toLocaleString()}
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-6">
//             {!showEditModal ? (
//               <button
//                 onClick={() => setShowEditModal(true)}
//                 className="flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.8}
//                   stroke="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
//                   />
//                 </svg>
//                 Edit Profile
//               </button>
//             ) : (
//               <EditUserInfo
//                 // user={userObj}
//                 onClose={()=>{
//                   setShowEditModal(false)
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withDashboardLayout(Profile);

import React from "react";
import withDashboardLayout from "../../hocs/withDashboardLayout";
import { logout } from "../../utils/logout";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../../store/slices/authSlice";
import EditUserInfo from "./editUserInfo";

function Profile() {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!user)
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        Loading profile...
      </div>
    );

  const handleLogout = () => {
    logout();
    dispatch(logoutRedux());
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl p-6">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
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
              d="M5.121 17.804A9.003 9.003 0 0112 15a9.003 9.003 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            My Profile
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </header>

      {message && (
        <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Personal Info */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center sm:w-1/3">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=8b5cf6&color=fff`}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-violet-500 shadow-sm"
          />
          <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <div className="mt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-700/20 dark:text-purple-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-5">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Name</label>
            <input
              type="text"
              value={user.name || ""}
              disabled
              className="w-full px-3 py-2 rounded-lg border text-gray-800 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-3 py-2 rounded-lg border text-gray-800 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Status</label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                user.status === "approved"
                  ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                  : user.status === "pending"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                  : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
              }`}
            >
              {user.status}
            </span>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Account Created
            </label>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            {!showEditModal ? (
              <button
                onClick={() => setShowEditModal(true)}
                className="flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
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
                    d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
                  />
                </svg>
                Edit Profile
              </button>
            ) : (
              <EditUserInfo onClose={() => setShowEditModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withDashboardLayout(Profile);
