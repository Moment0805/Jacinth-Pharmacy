"use client";
import React, { useState } from "react";
import Image from "next/image";
import OtpInput from "@/app/components/otp";

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
const SignUpPage = ({
  onNext,
}: {
  onNext: (step: string) => void;
}) => {
  const [formData, setFormData] = useState({
    otp:""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp) {
      onNext("verify-otp");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-8 py-6">
        <JacinthLogo />
        <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 px-4 py-1.5 rounded-full shadow-sm transition">
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

            <h1 className="text-[20px] font-bold text-gray-900 leading-tight flex justify-center items-center">
              Enter the 4-digit OTP we just sent to 
iamjacinth@gmail.com 
            </h1>
            
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <OtpInput/>
            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-full font-medium text-sm transition-all mt-6"
            >
              Verify OTP
            </button>

 {/* Terms and Conditions */}
            <p className="text-xs text-gray-600 flex justify-center pt-1 leading-relaxed">
              Didn&apos;t get the code? {""}
              <a
                href="#"
                className="text-green-600 hover:underline font-medium "
              >
                 Resend OTP
              </a>
            </p>

            {/* Return to Homepage Link */}
            <div className="text-center pt-3">
              <button
                type="button"
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
};

export default SignUpPage;
