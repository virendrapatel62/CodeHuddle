"use client";

import { useAuthStore } from "@/store/auth";
import React, { useState } from "react";

export default function LoginPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    const loginResponse = await login(email.toString(), password.toString());
    if (loginResponse.error) {
      setError(loginResponse.error!.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}
