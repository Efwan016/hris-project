import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", marginTop: "60px" }}>
        {sidebarOpen && (
          <Sidebar onLinkClick={() => setSidebarOpen(false)} />

        )}
        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
