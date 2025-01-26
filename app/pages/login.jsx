import React from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;
