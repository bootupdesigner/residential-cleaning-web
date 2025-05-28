"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/Header";
import LayoutWrapper from "./layout-client";
import { API_BASE_URL } from "../../lib/config";

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
      <div style={styles.container}>
        <Header back={false} home={false} title={"JMAC Cleaning Services"} booking={false} />
        <div style={styles.content}>
          <h2>{user ? `Welcome, ${user.firstName}` : "Welcome to JMAC Cleaning Services"}</h2>
          <p>
            Residential cleaning - Houses, apartments, condos, and townhomes. Customize your cleaning experience with JMAC Cleaning Services starting at only $150 for your 1 bedroom / 1 bathroom home.{" "}
            {user ? "Book your next cleaning today." : "Sign up for an instant quote."}
          </p>
          <img
            src="https://images.pexels.com/photos/4239067/pexels-photo-4239067.jpeg"
            alt="Cleaning Service"
            style={styles.image}
          />
          {user ? (
            <button onClick={handleBookingPress} style={styles.button} disabled={isLoading}>
              {isLoading ? "Loading..." : "Book a Cleaning"}
            </button>
          ) : (
            <div>
              <button
                onClick={() => router.push("/signup")}
                style={{ ...styles.button, backgroundColor: "#28a745" }}
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/signin")}
                style={{ ...styles.button, backgroundColor: "blue" }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "auto", padding: "20px" },
  content: { padding: "20px", textAlign: "center" },
  image: { width: "100%", borderRadius: "10px", marginBottom: "20px" },
  button: {
    padding: "15px",
    borderRadius: "5px",
    color: "white",
    background: "#007bff",
    border: "none",
    cursor: "pointer",
    margin: "10px 0",
    width: "100%",
  },
};
