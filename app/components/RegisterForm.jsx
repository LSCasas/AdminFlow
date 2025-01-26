import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import { useRouter } from "next/router";
import { createAdmin } from "../api/api";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await createAdmin({
        email: data.email,
        password: data.password,
      });
      toast.success("Usuario registrado", {
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
      console.error("Registration failed:", error.message);

      toast.error(
        error.message ||
          "Hubo un problema con el registro. Intenta nuevamente.",
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
    <div className="bg-white rounded-lg shadow-lg p-8 w-[90vh]">
      <Toaster />
      <h2 className="mb-4 text-center text-2xl font-bold text-[#B0005E]">
        Registro
      </h2>
      <form id="registerForm" onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
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
            className="block text-sm font-medium text-[#6C0036]"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
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
            className="text-xs text-[#B0005E] cursor-pointer hover:text-[#6C0036]"
          >
            {showPassword ? "😳 Hide " : "😎 Show"} Password
          </span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
