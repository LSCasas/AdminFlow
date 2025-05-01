import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import { useRouter } from "next/router";
import { createAdmin } from "@/api/api";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await createAdmin({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("User registered.", {
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
          "There was a problem with the registration. Please try again.",
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

  const password = watch("password");

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-[90vh]">
      <Toaster />
      <h2 className="mb-4 text-center text-2xl font-bold text-[#B0005E]">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.username }
            )}
            {...register("username", {
              required: "The username is required.",
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

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
            {...register("email", { required: "The email is required." })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
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
            {...register("password", {
              required: "The password is required.",
              minLength: {
                value: 8,
                message: "It must be at least 8 characters long.",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_.])[A-Za-z\d@$!%*?&\-_.]{8,}$/,
                message:
                  "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Confirm password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.confirmPassword }
            )}
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "The passwords do not match.",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          <span
            onClick={handleShowHidePassword}
            className="text-xs text-[#B0005E] cursor-pointer hover:text-[#6C0036]"
          >
            {showPassword ? "😳 Hide" : "😎 Show"} password
          </span>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
