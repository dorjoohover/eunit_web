"use client";
import { getUser } from "@/app/(api)/user.api";
import { UserModel } from "@/models/user.model";
import { useEffect, useState } from "react";

// Fetch or retrieve user data from localStorage
async function getProfileData(): Promise<UserModel | null> {
  const value = localStorage.getItem("user");
  if (value) {
    return JSON.parse(value);
  } else {
    const res = await getUser();
    localStorage.setItem("user", JSON.stringify(res));
    return res;
  }
}

function useUserData() {
  const [user, setUser] = useState<UserModel | null>(null);

  const handleChangeStorage = async () => {
    const value = await getProfileData();
    setUser(value);
  };

  useEffect(() => {
    // Initial load
    handleChangeStorage();

    // Handle localStorage changes from other tabs/windows
    window.addEventListener("storage", handleChangeStorage);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", handleChangeStorage);
  }, []);

  return {
    user,
    refresh: handleChangeStorage,
  };
}

export default useUserData;
