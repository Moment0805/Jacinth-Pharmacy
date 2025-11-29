"use client";
import { useState, useRef, useEffect } from "react";

interface OtpInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function OtpInput({ value = "", onChange }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Sync internal state with external value prop
  useEffect(() => {
    if (!value) {
      return;
    }
    
    const currentOtpString = otp.join("");
    if (value === currentOtpString) {
      return;
    }

    const digits = value.split("").slice(0, 4);
    const newOtp: string[] = ["", "", "", ""];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    
    // Use requestAnimationFrame to defer setState
    requestAnimationFrame(() => {
      setOtp(newOtp);
    });
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (inputValue: string, index: number) => {
    if (!/^\d*$/.test(inputValue)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = inputValue;
    setOtp(newOtp);

    // Call onChange with the full OTP string
    const otpString = newOtp.join("");
    onChange?.(otpString);

    // Move to next input automatically
    if (inputValue && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move back on Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-5">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          className="w-14 h-14 text-center text-gray-700 border-2 border-gray-300 rounded-xl text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-transparent transition-all"
        />
      ))}
    </div>
  );
}
