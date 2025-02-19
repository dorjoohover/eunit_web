import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
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
  const [countdown, setCountdown] = useState(60);

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
  const router = useRouter();
  const verifyOTP = async () => {
    try {
      setLoading(true);
      const confirm = await confirmationResult?.confirm(otp);
      const token = await confirm?.user?.getIdToken();
      if (token) {
        const res = await fetch("/api/login/phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        }).then((d) => d.json());
        if (res.success) {
          notifications.show({
            position: "top-center",
            message: "Амжилттай нэвтэрлээ!",
          });
          router.refresh();
        } else {
          notifications.show({ position: "top-center", message: res.message });
        }
      } else {
        notifications.show({
          position: "top-center",
          message: "Амжилтгүй дахин оролдоно уу",
        });
      }
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
      setCountdown(60);
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
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOTP} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button onClick={resendOTP} disabled={countdown > 0 || loading}>
            Resend OTP {countdown > 0 ? `(${countdown})` : ""}
          </button>
        </>
      )}
      <div id="recaptcha-container" />
    </div>
  );
};

export default PhoneAuth;
