import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import { useRouter } from "next/router";
import { login } from "@/api/api";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      const token = response.token;
      localStorage.setItem("token", token);
      toast.success("Bienvenido", {
        position: window.innerWidth < 640 ? "top-center" : "bottom-left",
        style: {
          fontSize: "20px",
          padding: "20px",
          maxWidth: "90vw",
          width: "auto",
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);

      toast.error(
        error.message ||
          "Hubo un problema con el inicio de sesión. Intenta nuevamente.",
        {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "20px",
            padding: "20px",
            maxWidth: "90vw",
            width: "auto",
          },
        }
      );
    }
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <Toaster />
      <h2 className="mb-4 text-center text-2xl font-bold text-[#1C2039]">
        Login
      </h2>
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#1C2039]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-2 border-[#e0e0e0] shadow-sm",
              { "border-red-500": errors.email }
            )}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1C2039]"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-2 border-[#e0e0e0]shadow-sm",
              { "border-red-500": errors.password }
            )}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <span
            onClick={handleShowHidePassword}
            className="text-xs text-[#1C2039] cursor-pointer hover:text-[#EEB345]"
          >
            {showPassword ? "😳 Hide " : "😎 Show"} Password
          </span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#EEB345] text-white rounded-md hover:bg-[#936F2B]"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
