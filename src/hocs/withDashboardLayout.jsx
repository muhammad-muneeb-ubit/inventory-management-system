import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

export default function withDashboardLayout(PageComponent) {
  return function WrappedWithLayout(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header
            auth={true}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <PageComponent {...props} />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  };
}
