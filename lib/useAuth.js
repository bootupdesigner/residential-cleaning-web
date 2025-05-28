"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "./config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      checkAuthStatus();
    }
  }, [hasHydrated]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (err) {
      handleLogout();
    }
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) { }
  };

  const login = async (token) => {
    try {
      localStorage.setItem("authToken", token);
      console.log("🔐 Token saved:", token);
  
      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("✅ Profile response:", res.data);
  
      if (res.status === 200 && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
        window.location.href = "/booking";
      } else {
        console.warn("❗ Unexpected response while logging in", res);
        alert("Unexpected login issue.");
      }
    } catch (err) {
      console.error("❌ Login fetch error:", err.response?.data || err.message);
      alert("Session failed to initialize. Please try again.");
      localStorage.removeItem("authToken");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/signin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, handleLogout, checkAuthStatus, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("⚠️ useAuth called outside AuthProvider");
  }
  return context;
};
