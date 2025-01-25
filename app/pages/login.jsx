import React from "react";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
