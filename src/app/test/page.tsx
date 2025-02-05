"use client";

import { useState, useEffect } from "react";

import { notifications } from "@mantine/notifications";
import { Button, Card, Input } from "@mantine/core";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
        }
      );
    }
  }, []);

  const sendOtp = async (phone: string) => {
    try {
      // Ensure reCAPTCHA is properly initialized
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal", // Or 'normal' for a visible CAPTCHA
            callback: (response: any) => {
              console.log("reCAPTCHA verified:", response);
            },
          }
        );
      }

      const appVerifier = (window as any).recaptchaVerifier;
      const formattedPhone = `+976${phone}`; // Ensure proper phone number formatting
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      console.log("OTP sent successfully:", confirmationResult);
      setStep(2);
      return confirmationResult;
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await confirmation.confirm(otp);
      const idToken = await result.user.getIdToken();
      // const res = await fetch("/api/auth/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ idToken }),
      // });
      // if (res.ok) {
      //   notifications.show({ message: "Login successful!" });
      // } else {
      //   notifications.show({ message: "Verification failed." });
      // }
      console.log(idToken);
    } catch (error: any) {
      notifications.show({ message: "Invalid OTP. Try again." });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] p-6">
        <Card.Section>
          {step === 1 ? (
            <>
              <Input
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div id="recaptcha-container"></div>
              <Button
                className="mt-4 w-full"
                onClick={() => sendOtp(phone)}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                className="mt-4 w-full"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}
        </Card.Section>
      </Card>
    </div>
  );
}
