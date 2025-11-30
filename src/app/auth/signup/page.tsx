"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api, handleApiResponse, getErrorMessage } from "@/app/lib/api";
import { toast } from "@/app/components/Toast";

// ✅ Reusable Logo Component
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

// ✅ SignUpPage Component
export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.fullName || !formData.email) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await api.signup({
        fullName: formData.fullName,
        email: formData.email,
      });
      const data = await handleApiResponse(response);
      
      if (data.message) {
        router.push(`/auth/otp?email=${encodeURIComponent(formData.email)}`);
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
          onClick={() => router.push("/auth/login")}
          className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm transition"
        >
          Log in
        </button>
      </div>

      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[520px]  rounded-3xl shadow-sm py-12 px-24">
          {/* Progress Steps */}
          <div className="mb-10 ">
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
              <span className="text-gray-400 font-medium">2. Verify OTP</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-gray-400 font-medium">3. Set up</span>
            </div>

            <h1 className="text-[32px] font-bold text-gray-900 leading-tight flex justify-center">
              Create your account
            </h1>
            
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Full name"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

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

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-600 pt-1 leading-relaxed">
              By creating an account, you agree to the Jacinth{" "}
              <a
                href="#"
                className="text-green-600 hover:underline font-medium"
              >
                Terms & Conditions
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="text-green-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-semibold text-sm transition-all mt-6"
            >
              {loading ? "Creating account..." : "Create your account"}
            </button>

            {/* Return to Homepage Link */}
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
