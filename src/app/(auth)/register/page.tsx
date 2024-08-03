"use client";

import { useAuthStore } from "@/store/auth";
import React, { useState } from "react";

function RegisterPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formDataObject = Object.fromEntries(formData.entries());

    const { firstName, lastName, email, password } = formDataObject;

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all the fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await createAccount(
      `${firstName} ${lastName}`,
      email.toString(),
      password.toString()
    );

    if (response.error) {
      setError(response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());

      if (loginResponse.error) {
        setError(loginResponse.error!.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div>{error && <p>{error}</p>}</div>

      <div>
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
}

export default RegisterPage;
