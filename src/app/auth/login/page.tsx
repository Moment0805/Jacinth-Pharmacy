"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api, handleApiResponse, getErrorMessage, setAuthToken } from "@/app/lib/api";
import { toast } from "@/app/components/Toast";

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

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await api.login({
        email: formData.email,
        password: formData.password,
      });
      const data = await handleApiResponse(response);
      
      if (data.access_token) {
        setAuthToken(data.access_token);
        router.push("/");
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
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

            <h1 className="text-[32px] font-bold text-gray-900 leading-tight flex justify-center">
              Welcome Back
            </h1>
            
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold text-sm transition-all mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Return to Homepage Link */}
            <div className="text-center text-sm text-gray-700 pt-3">
                Forgot password? {""}
              <a
                href="/auth/reset-password"
                className="text-sm text-green-600 hover:text-green-900 underline underline-offset-2"
              >
                Reset here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
