"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/Header";
import LayoutWrapper from "./layout-client";
import { API_BASE_URL } from "../../lib/config";
import WelcomeSection from "../../components/WelcomeSection";
import CleaningServices from "../../components/CleaningServices";

export default function ResidentialCleaning() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // ✅ Avoid hydration mismatch
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // ✅ Load user info only after hydration
  useEffect(() => {
    if (!hasHydrated) return;

    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.warn("User fetch failed:", error.message);
        setUser(null);
      }
    };

    fetchUser();
  }, [hasHydrated]);

  const handleBookingPress = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
    router.push(token ? "/booking" : "/signin");
    setIsLoading(false);
  };

  if (!hasHydrated) return null;

  return (
    <LayoutWrapper>
      <Header back={false} home={false} title={"JMAC Residential Cleaning Services"} booking={false} />
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ textAlign: 'center', }}>{user ? `Welcome, ${user.firstName}` : "Welcome to JMAC Cleaning Services"}</h2>
       
        <WelcomeSection
          router={router}
          handleBookingPress={handleBookingPress}
          isLoading={isLoading}
          user={user}
        />

        <CleaningServices/>
      </div>
    </LayoutWrapper>
  );
}

