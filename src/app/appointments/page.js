"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import LayoutWrapper from "../layout-client";
import { API_BASE_URL } from "../../../lib/config";

export default function AppointmentsPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Convert time to 24-hour format for comparison
    const convertTo24HourFormat = (time) => {
        const [timePart, period] = time.split(" ");
        let [hours, minutes] = timePart.split(":");

        if (period === "PM" && hours !== "12") hours = String(+hours + 12);
        else if (period === "AM" && hours === "12") hours = "00";

        return `${hours}:${minutes}:00`;
    };

    // ✅ Load user profile
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) return router.replace("/signin");

            try {
                const headers = { Authorization: `Bearer ${token}` };
                const res = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });
                setUser(res.data);
            } catch (error) {
                console.error("Error loading user:", error);
                router.replace("/signin");
            }
        };

        fetchUser();
    }, []);

    // ✅ Fetch appointments
    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;

            const token = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${token}` };
            const endpoint = user.role === "admin" ? "/api/bookings/all" : "/api/bookings/user-bookings";

            try {
                const res = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const sorted = res.data.bookings
                    .map((booking) => ({
                        ...booking,
                        dateTime: new Date(`${booking.date}T${convertTo24HourFormat(booking.time)}`),
                    }))
                    .filter((b) => b.dateTime >= today)
                    .sort((a, b) => a.dateTime - b.dateTime);

                setBookings(sorted);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleCancelBooking = async (bookingId) => {
        const confirm = window.confirm("Are you sure you want to cancel this appointment?");
        if (!confirm) return;

        const token = localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            await axios.delete(`${API_BASE_URL}/api/bookings/cancel/${bookingId}`, { headers });
            setBookings((prev) => prev.filter((b) => b._id !== bookingId));
            window.alert("Appointment canceled.");
        } catch (err) {
            console.error("Cancel error:", err);
            window.alert("Failed to cancel. Please try again.");
        }
    };

    if (isLoading) {
        return <div style={{ padding: 20 }}>Loading...</div>;
    }

    return (
        <LayoutWrapper>
            <Header back home title="Appointments" />
            <div className="container py-5">
                {bookings.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#888" }}>No appointments found.</p>
                ) : (
                    bookings.map((b, i) => (
                        <div key={i} style={styles.appointmentCard}>
                            <p><strong>Date:</strong> {new Date(`${b.date}T00:00:00`).toDateString()}</p>
                            <p><strong>Time:</strong> {b.time}</p>
                            <p><strong>Address:</strong> {b.serviceAddress}, {b.city}, {b.state} {b.zipCode}</p>
                            <p>
                                <strong>User:</strong>{" "}
                                {b.userId ? `${b.userId.firstName} ${b.userId.lastName} (${b.userId.email})` : "Unknown User"}
                            </p>

                            <button style={styles.cancelBtn} onClick={() => handleCancelBooking(b._id)}>Cancel</button>
                        </div>
                    ))
                )}

                <button
                    style={{ backgroundColor: "#ff9800", padding: 15, borderRadius: 5, color: "white", marginTop: 30 }}
                    onClick={() => router.push("/previous-bookings")}
                >
                    View Previous Appointments
                </button>
            </div>
        </LayoutWrapper>
    );
}

const styles = {
    appointmentCard: {
        background: "#f9f9f9",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    cancelBtn: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 15px",
        marginTop: 10,
        borderRadius: 5,
        cursor: "pointer",
    },
};
