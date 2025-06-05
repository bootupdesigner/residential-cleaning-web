"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import ContactInfoComponent from "../../../components/ContactInfoComponent";
import { API_BASE_URL } from "../../../lib/config";
import LayoutWrapper from "../layout-client";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch user on mount
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

        setUser(res.data);
        setContactInfo({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });
      } catch (err) {
        router.replace("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateContact = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.alert("Authentication error. Please sign in again.");
      router.push("/signin");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const payload = {};
    if (contactInfo.firstName) payload.firstName = contactInfo.firstName;
    if (contactInfo.lastName) payload.lastName = contactInfo.lastName;
    if (contactInfo.email) payload.email = contactInfo.email;
    if (contactInfo.phone) payload.phone = contactInfo.phone;

    if (Object.keys(payload).length === 0) {
      window.alert("No valid fields provided for update.");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/users/profile`, payload, { headers });
      window.alert("Contact information updated successfully!");
      router.push("/user-profile");
    } catch (error) {
      window.alert(error.response?.data?.message || "Contact information update failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "red" }}>User data not found. Please sign in again.</p>
        <button onClick={() => router.push("/signin")}>Sign In</button>
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <Header home back title="Edit User Profile" />
      <div className="container py-5">
        {contactInfo && (
          <ContactInfoComponent
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            showPassword={false}
          />
        )}
        <button
          onClick={handleUpdateContact}
          style={{
            marginTop: 20,
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 5,
          }}
        >
          Update Contact Info
        </button>
      </div>
    </LayoutWrapper>
  );
}
