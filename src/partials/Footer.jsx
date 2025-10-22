import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (

    <footer className="text-center w-full border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className=" text-sm text-gray-500 dark:text-gray-400">
          © {year} HYDRA FOODS — Inventory Management System — All rights reserved.
  
        </div>
      </div>
    </footer>
    
  );
}
