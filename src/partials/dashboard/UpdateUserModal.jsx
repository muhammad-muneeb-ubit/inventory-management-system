// // components/UpdateUserModal.jsx
// import React, { useState, useEffect } from "react";

// function UpdateUserModal({ user, onClose, onSave }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
   
//   });

//   useEffect(() => {
//     if (user) setFormData(user);
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-5 h-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 
//               8.586l4.293-4.293a1 1 0 
//               111.414 1.414L11.414 10l4.293 
//               4.293a1 1 0 
//               01-1.414 1.414L10 11.414l-4.293 
//               4.293a1 1 0 
//               01-1.414-1.414L8.586 10 4.293 
//               5.707a1 1 0 
//               010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>

//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//           Update User
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Name</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
//               required
//             />
//           </div>


//           <div className="flex justify-end gap-2 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UpdateUserModal;


import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().trim().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().trim().email("Enter a valid email").required("Email is required"),
});

function UpdateUserModal({ user , onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // reset form when user prop changes
  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  const submit = async (data) => {
    // onSave may be async; propagate errors to caller
    try {
      let newUser = { ...user, ...data };
      await onSave(newUser);
      onClose();
    } catch (err) {
      // let parent handle error display; keep console for debugging
      console.error("Update user failed:", err);
      throw err;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close dialog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 
              8.586l4.293-4.293a1 1 0 
              111.414 1.414L11.414 10l4.293 
              4.293a1 1 0 
              01-1.414 1.414L10 11.414l-4.293 
              4.293a1 1 0 
              01-1.414-1.414L8.586 10 4.293 
              5.707a1 1 0 
              010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Update User</h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserModal;