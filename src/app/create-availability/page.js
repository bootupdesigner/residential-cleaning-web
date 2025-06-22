"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import moment from "moment";
import Header from "../../../components/Header";
import { API_BASE_URL } from "../../../lib/config";
import LayoutWrapper from "../layout-client";

export default function CreateAvailabilityPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [existingAvailability, setExistingAvailability] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const availableTimes = [
    "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });
        setUser({ ...res.data, token });
      } catch (err) {
        router.replace("/signin");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.token) fetchAllAvailability();
  }, [user]);

  useEffect(() => {
    if (selectedDate) fetchAvailabilityForDate();
  }, [selectedDate]);

  const fetchAllAvailability = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
  
      const availabilityArr = res.data.availability || [];
      const today = moment().format("YYYY-MM-DD");
  
      // ✅ Convert array to object: { date: [...times] }
      const availabilityObj = {};
      availabilityArr.forEach(({ date, times }) => {
        if (date >= today) {
          availabilityObj[date] = times;
        }
      });
  
      const filteredDates = Object.keys(availabilityObj).sort();
  
      setExistingAvailability(availabilityObj);
      setAvailableDates(filteredDates);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch availability.");
      setExistingAvailability({});
    }
  };
  

  const fetchAvailabilityForDate = () => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setSelectedTimes(existingAvailability[formattedDate] || []);
  };

  const toggleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const handleDateChange = (e) => {
    const date = new Date(`${e.target.value}T00:00:00`);
    setSelectedDate(date);
  };

  const submitAvailability = async () => {
    if (selectedTimes.length === 0) {
      alert("Please select at least one time.");
      return;
    }

    const payload = {
      date: moment(selectedDate).format("YYYY-MM-DD"),
      times: selectedTimes.map(t => t.trim())
    };

    try {
      await axios.put(`${API_BASE_URL}/api/admin/update-availability`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Availability updated!");
      fetchAllAvailability();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update availability.");
    }
  };

  const deleteAvailability = async () => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/delete-availability`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { date: formattedDate }
      });
      alert("Availability deleted!");
      fetchAllAvailability();
      setSelectedTimes([]);
    } catch (err) {
      alert("Failed to delete availability.");
    }
  };

  return (
    <LayoutWrapper>
      <Header home back title="Manage Availability" />
      <div className="container py-5">
        <h2>📆 Existing Availability</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
          {availableDates.length > 0 ? (
            availableDates.map((date) => (
              <span key={date} style={{ fontSize: 16 }}>
                📅 {moment(date).format("ddd, MMM D")}
              </span>
            ))
          ) : (
            <p>No availability set.</p>
          )}
        </div>

        <label style={{ fontWeight: "bold" }}>Select Date:</label>
        <input
          type="date"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={handleDateChange}
          style={{ padding: 10, marginBottom: 20 }}
        />

        <p><strong>Selected:</strong> {selectedDate.toDateString()}</p>

        <h3>⏰ Select Times</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => toggleTimeSelection(time)}
              style={{
                backgroundColor: selectedTimes.includes(time) ? "green" : "#eee",
                color: selectedTimes.includes(time) ? "white" : "black",
                padding: "10px 15px",
                border: "none",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              {time}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <button
            onClick={submitAvailability}
            style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: 5 }}
          >
            Update Availability
          </button>

          <button
            onClick={deleteAvailability}
            style={{ padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: 5, marginLeft: 10 }}
          >
            Delete Availability for Selected Date
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
