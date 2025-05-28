"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/useAuth";

const Footer = () => {

  const router = useRouter();
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated, handleLogout } = auth;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <footer style={styles.container}>
      {isLoggedIn ? (
        <div style={styles.container}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/user-profile">Profile</Link>
          <span onClick={handleLogout} style={styles.logoutText}>Logout</span>
        </div>
      ) : (
        <div style={styles.container}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/signin">Sign In</Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px 0",
    alignItems: "center",
    backgroundColor: "orange",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
