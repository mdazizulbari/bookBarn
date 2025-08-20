import { Outlet } from "react-router-dom";
import SidebarDashboard from "./Dashboard";
 // renamed to match your last code

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarDashboard />
      <main style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
