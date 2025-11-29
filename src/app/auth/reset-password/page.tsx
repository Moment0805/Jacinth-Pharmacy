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

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      // TODO: Call reset password API
      // For now, navigate to OTP page
      router.push(`/auth/otp?email=${encodeURIComponent(formData.email)}&type=reset`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-8 py-6">
        <JacinthLogo />
        <button 
          onClick={() => router.push("/auth/signup")}
          className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-full shadow-sm transition"
        >
          Sign up
        </button>
      </div>

      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[520px]  rounded-3xl shadow-sm py-12 px-24">
          {/* Progress Steps */}
          <div className="mb-10 ">

            <h1 className="text-[24px] font-bold text-gray-900 leading-tight flex justify-center mb-4">
              Reset your password
            </h1>
            <p className="text-xs text-gray-600 text-center">
              Enter the email address you used to register this account
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-full font-semibold text-sm transition-all mt-6"
            >
              Send Reset Link
            </button>

            {/* Return to Homepage Link */}
            <div className="text-center text-sm text-gray-700 pt-3">
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-sm text-green-600 hover:text-green-900 hover:underline underline-offset-1"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
