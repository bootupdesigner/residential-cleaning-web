"use client";

import React, { useEffect, useState,  } from "react";
import LayoutWrapper from "../layout-client";
import SignInForm from "../../../components/SignInForm";

const SignIn = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null; // ❌ prevents SSR mismatch

  return (
    <LayoutWrapper>
      <div style={{ padding: 20, margin: "0px auto 30px auto" }}>
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
