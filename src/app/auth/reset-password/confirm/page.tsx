"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/app/components/otp";
import { api, handleApiResponse, getErrorMessage } from "@/app/lib/api";

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

function ResetPasswordConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await api.resetPasswordConfirm({
        email,
        code: otp,
        newPassword: password,
      });
      await handleApiResponse(response);
      router.push("/auth/login?message=Password reset successful");
    } catch (err) {
      setError(getErrorMessage(err));
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
        <div className="w-full max-w-[520px] rounded-3xl border-1 py-12 px-24">
          <div className="mb-10">
            <h1 className="text-[24px] font-bold text-gray-900 leading-tight flex justify-center items-center text-center mb-4">
              Reset your password
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Enter the OTP sent to {email || "your email"} and your new password
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP Code
              </label>
              <OtpInput value={otp} onChange={setOtp} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={8}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !otp || otp.length !== 4 || !password || !confirmPassword}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-medium text-sm transition-all mt-6"
            >
              {loading ? "Resetting password..." : "Reset Password"}
            </button>

            <div className="text-center pt-3">
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
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

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <ResetPasswordConfirmContent />
    </Suspense>
  );
}

