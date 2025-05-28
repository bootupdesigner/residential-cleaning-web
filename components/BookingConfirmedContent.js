"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Header from "./Header";
import { API_BASE_URL } from "../lib/config";
import LayoutWrapper from "../src/app/layout-client";

export default function BookingConfirmedContent() {
  const [user, setUser] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    const date = searchParams.get("selectedDate");
    const time = searchParams.get("selectedTime");

    if (!date || !time) {
      router.replace("/"); // or show a message
    } else {
      setSelectedDate(date);
      setSelectedTime(time);
    }
  }, [searchParams]);


  useEffect(() => {
    if (!hasHydrated) return;

    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/signin");
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user data:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [hasHydrated, router]);

  if (!hasHydrated || isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!user) return <p style={{ textAlign: "center", color: "red" }}>User data not found. Please try again.</p>;

  const formattedDate = selectedDate ? new Date(selectedDate).toDateString() : "No Date Selected";
  const formattedTime = selectedTime || "No Time Selected";

  return (
    <LayoutWrapper>
    <div style={styles.container}>
      <Header title="Booking Confirmation" back={false} home={true} />
      <div style={styles.content}>
        <h2 style={styles.headerText}>✅ Booking Confirmed</h2>
        <p style={styles.thankYouText}>Thank you for your booking, {user.firstName}!</p>
        <div style={styles.detailsContainer}>
          <h3 style={styles.detailsTitle}>Appointment Details</h3>
          <Detail label="📍 Address" value={user.serviceAddress} />
          <Detail label="🗺️ City/State" value={`${user.city}, ${user.state} ${user.zipCode}`} />
          <Detail label="🏠 Home Type" value={user.homeType?.charAt(0).toUpperCase() + user.homeType?.slice(1)} />
          <Detail label="📅 Date" value={formattedDate} />
          <Detail label="⏰ Time" value={formattedTime} />
        </div>
      </div>
    </div>
    </LayoutWrapper>
  );
}

const Detail = ({ label, value }) => (
  <p style={styles.detailRow}><strong>{label}:</strong> <span>{value}</span></p>
);

const styles = {
  container: { padding: 20, maxWidth: 800, margin: "auto" },
  content: { paddingTop: 20 },
  headerText: { fontSize: 28, color: "green", textAlign: "center" },
  thankYouText: { fontSize: 18, textAlign: "center", margin: "20px 0", color: "#333" },
  detailsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  detailsTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  detailRow: { fontSize: 16, marginBottom: 10, color: "#555" },
};
