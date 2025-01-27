import React from "react";
import Navbar from "@/components/layout/Navbar";
import ActivitySummary from "@/components/activity/ActivitySummary";
import InventoryStatus from "@/components/inventory/InventoryStatus";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          <ActivitySummary />
          <InventoryStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
