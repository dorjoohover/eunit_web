// "use client";

// import { useState } from "react";

// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { app } from "./firebase";

// const auth = getAuth(app);
// auth.settings.appVerificationDisabledForTesting = true;
// auth.languageCode = 'mn'
// const setUpRecaptcha = () => {
//   (window as any).recaptchaVerifier = new RecaptchaVerifier(
//     auth,
//     "recaptcha-container",
//     {
//       size: "normal", // Use "normal" to see it visually
//       callback: (response: any) => {
//         console.log("Recaptcha verified:", response);
//       },
//     }
//   );
// };

// export const sendOTP = async (phoneNumber: string) => {
//   try {
//     var testVerificationCode = "123456";
//     setUpRecaptcha();
//     const res = await signInWithPhoneNumber(
//       auth,
//       phoneNumber,
//       (window as any).recaptchaVerifier
//     )
//       .then((d) => {
//         return d.confirm(testVerificationCode);
//       })
//       .catch((d) => console.log("err", d));
//     console.log(res);
//     // console.log("OTP sent:", confirmationResult);
//     // return confirmationResult;
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//   }
// };

// export default function PhoneAuth() {
//   const [phone, setPhone] = useState("+976"); // Default Mongolia country code
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);
//   const [message, setMessage] = useState("");

//   const handleVerifyOTP = async () => {
//     if (!confirmationResult) {
//       setMessage("First send an OTP.");
//       return;
//     }

//     try {
//       await confirmationResult.confirm(otp);
//       setMessage("Phone number verified successfully!");
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setMessage("Invalid OTP. Try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-6">
//       <h1 className="text-xl font-bold">Phone Authentication</h1>

//       <input
//         type="text"
//         placeholder="Enter phone number (+976XXXXXXXX)"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="border p-2 w-80"
//       />

//       <button
//         onClick={() => sendOTP(phone)}
//         className="bg-blue-500 text-white p-2 w-80"
//       >
//         Send OTP
//       </button>

//       <div id="recaptcha-container"></div>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="border p-2 w-80"
//       />

//       <button
//         onClick={handleVerifyOTP}
//         className="bg-green-500 text-white p-2 w-80"
//       >
//         Verify OTP
//       </button>

//       {message && <p className="text-red-500">{message}</p>}
//     </div>
//   );
// }
