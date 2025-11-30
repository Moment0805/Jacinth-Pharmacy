"use client";
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "@/app/components/otp";
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

// ✅ OTP Page Content Component
function OtpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const response = await api.verifyOtp({
        email,
        code: otp,
      });
      const data = await handleApiResponse(response);
      
      if (data.message) {
        router.push(`/auth/setup-account?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.signup({
        fullName: "", // Resend doesn't need fullName
        email,
      });
      await handleApiResponse(response);
      setSuccess("OTP has been resent to your email");
      toast.success("OTP has been resent to your email");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setResending(false);
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
        <div className="w-full max-w-[520px]  rounded-3xl border-1 py-12 px-24">
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
              <span className="text-gray-400 font-medium">3. Set up</span>
            </div>

            <h1 className="text-[20px] font-bold text-gray-900 leading-tight flex justify-center items-center text-center">
              Enter the 4-digit OTP we just sent to {email || "your email"}
            </h1>
            
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} />
            
            {/* Error Message */}
            {error && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                {success}
              </div>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading || !otp || otp.length !== 4}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-medium text-sm transition-all mt-6"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP */}
            <p className="text-xs text-gray-600 flex justify-center pt-1 leading-relaxed">
              Didn&apos;t get the code? {""}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-green-600 hover:underline font-medium disabled:text-gray-400"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </p>

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

// ✅ OTP Page Component with Suspense
export default function OtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <OtpPageContent />
    </Suspense>
  );
}
