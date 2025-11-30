"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

function SetupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    countryCode: "+234",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.password) {
      setError("First name and password are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!email) {
      setError("Email is required. Please go back to signup.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.setupAccount(email, {
        firstName: formData.firstName,
        lastName: formData.lastName || undefined,
        phoneNumber: formData.phone ? `${formData.countryCode}${formData.phone}` : undefined,
        countryCode: formData.phone ? formData.countryCode : undefined,
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

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
                  required
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
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                  className="border border-gray-300 rounded-full px-3 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="+234">+234</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 8 character's long"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={8}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-gray-600 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-medium text-sm transition-all mt-4"
            >
              {loading ? "Setting up..." : "Continue"}
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

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <SetupPageContent />
    </Suspense>
  );
}
