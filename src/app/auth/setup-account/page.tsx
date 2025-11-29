"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const JacinthLogo = () => (
  <div className="w-24 h-8">
    <Image
      src="/Frame 132.svg"
      alt="Jacinth Logo"
      width={120}
      height={40}
      className="object-contain w-full h-full"
    />
  </div>
);

export default function SetupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.phone && formData.password) {
      // TODO: Call setup account API
      // For now, navigate to homepage
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-8 py-6">
        <JacinthLogo />
        <button 
          onClick={() => router.push("/auth/login")}
          className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm transition"
        >
          Log in
        </button>
      </div>

      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[520px] rounded-[20px] border border-gray-200 bg-white shadow-sm py-12 px-10">
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex justify-center gap-2 mb-8 text-sm">
              <span className="text-green-600 font-medium">1. Sign up</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-green-600"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-green-600 font-medium">2. Verify OTP</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-green-600"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-green-600 font-medium">3. Set up</span>
            </div>

            <h1 className="text-[32px] font-bold text-gray-900 text-center">
              Set up your account
            </h1>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-5 ">
            {/* Name Fields */}
            <div className="">
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Name
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="+234"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 8 character’s long"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-gray-600 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-full font-medium text-sm transition-all mt-4"
            >
              Continue
            </button>

            {/* Return to Homepage */}
            <div className="text-center pt-3">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
              >
                Return to homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
