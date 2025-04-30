import React from "react";
import Navbar from "@/components/layout/Navbar";
import RegisterForm from "@/components/forms/RegisterForm";

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="flex justify-center items-center py-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Admin;
