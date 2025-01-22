import React from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
