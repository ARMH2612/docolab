"use client";

import Image from "next/image";
import { Images } from "../assets";
import { signup, login } from "./actions";
import { useState } from "react";

export default function LoginPage() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await login(formData);
      //   redirect("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unexpected error occured.");
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="grid grid-cols-2 bg-gray-100 h-screen">
      <div className=" flex flex-col justify-center w-full  px-28 py-12 bg-white shadow-lg">
        <div className="mb-8 text-center">
          <Image
            src={Images.logo}
            alt="DocCoLab Logo"
            className="w-20 mx-auto"
            placeholder="blur"
            quality={100}
          />
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={waiting}
              className={`w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                waiting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
              }`}
            >
              {waiting ? "Logging in..." : "Log in"}
            </button>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
            </span>
            {/* TODO: don't forget to proceed the same as login */}
            <button
              formAction={signup}
              className="w-full py-2 text-blue-500 border border-blue-400 bg-white rounded-md hover:bg-blue-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      <div className=" hidden lg:flex items-center justify-center bg-blue-50 overflow-hidden ">
        <Image
          src={Images.illustration_1}
          alt="Illustration"
          className="h-full"
          placeholder="blur"
          quality={100}
        />
      </div>
    </div>
  );
}
