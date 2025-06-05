"use client";

import React, { useEffect, useState, } from "react";
import LayoutWrapper from "../layout-client";
import SignInForm from "../../../components/SignInForm";
import Header from "../../../components/Header";

const SignIn = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null; // ❌ prevents SSR mismatch

  return (
    <LayoutWrapper>
      <Header back={true} home={true} booking={false} title="Sign In" />

      <div className="container py-5">
        <SignInForm />
      </div>
    </LayoutWrapper>
  );
};

export default SignIn;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#fff",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
