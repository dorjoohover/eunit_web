import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
      }
    );
  }, []);

  const sendOTP = async () => {
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+976${phone}`,
        appVerifier
      );
      setConfirmationResult(confirmation);
      startCountdown();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      await confirmationResult?.confirm(otp);
      // User signed in
    } catch (error) {
      console.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setLoading(true);
      await sendOTP();
      setCountdown(30);
      startCountdown();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      {!confirmationResult ? (
        <>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number with country code"
          />
          <button onClick={sendOTP} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            pattern="[0-9]"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP оруулах"
          />
          <button onClick={verifyOTP} disabled={loading}>
            {loading ? "Шалгаж байна..." : "Шалгах"}
          </button>
          <button onClick={resendOTP} disabled={countdown > 0 || loading}>
            Дахин явуулах {countdown > 0 ? `(${countdown})` : ""}
          </button>
        </>
      )}
      <div id="recaptcha-container" />
    </div>
  );
};

export default PhoneAuth;
