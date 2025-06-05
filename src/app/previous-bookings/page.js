"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import { API_BASE_URL } from "../../../lib/config";
import LayoutWrapper from "../layout-client";

export default function PreviousBookingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [pastBookings, setPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const convertTo24HourFormat = (time) => {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (period === "PM" && hours !== "12") hours = String(+hours + 12);
    else if (period === "AM" && hours === "12") hours = "00";

    return `${hours}:${minutes}:00`;
  };

  const fetchUserAndBookings = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/signin");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      // ✅ Fetch user
      const userRes = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });
      setUser(userRes.data);

      // ✅ Fetch bookings
      const endpoint =
        userRes.data.role === "admin"
          ? "/api/bookings/all"
          : "/api/bookings/user-bookings";

      const bookingRes = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedPast = bookingRes.data.bookings
        .map((booking) => ({
          ...booking,
          dateTime: new Date(`${booking.date}T${convertTo24HourFormat(booking.time)}`),
        }))
        .filter((b) => b.dateTime < today)
        .sort((a, b) => b.dateTime - a.dateTime);

      setPastBookings(sortedPast);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch past bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndBookings();
  }, []);

  if (isLoading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <LayoutWrapper>
      <Header home back booking title="Previous Bookings" />
      <div className="container py-5">
        {pastBookings.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: 18 }}>
            No previous appointments found.
          </p>
        ) : (
          pastBookings.map((booking, index) => (
            <div key={index} style={styles.appointmentCard}>
              <p style={styles.date}>{new Date(booking.date).toDateString()}</p>
              <p style={styles.time}>⏰ Time: {booking.time}</p>
              <p style={styles.address}>
                📍 {booking.serviceAddress}, {booking.city}, {booking.state}{" "}
                {booking.zipCode}
              </p>
              <p style={styles.user}>
                👤{" "}
                {booking.user
                  ? `${booking.user.firstName} ${booking.user.lastName} (${booking.user.email})`
                  : "Unknown User"}
              </p>
            </div>
          ))
        )}
      </div>
    </LayoutWrapper>
  );
}

const styles = {
  appointmentCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  time: {
    fontSize: 18,
    color: "#555",
    margin: "5px 0",
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
};
