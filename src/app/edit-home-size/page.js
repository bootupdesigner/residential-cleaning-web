"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HomeSizeComponent from "../../../components/HomeSizeComponent";
import { API_BASE_URL } from "../../../lib/config";

export default function EditHomeSizePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [homeSize, setHomeSize] = useState({ bedrooms: 1, bathrooms: 1 });
  const [isLoading, setIsLoading] = useState(true);

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
        setHomeSize({
          bedrooms: res.data.homeSize?.bedrooms || 1,
          bathrooms: res.data.homeSize?.bathrooms || 1,
        });
      } catch (err) {
        router.replace("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateHomeSize = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.alert("Authentication error. Please sign in again.");
      router.push("/signin");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const payload = {
      homeSize: {
        bedrooms: homeSize.bedrooms > 0 ? homeSize.bedrooms : 1,
        bathrooms: homeSize.bathrooms > 0 ? homeSize.bathrooms : 1,
      },
    };

    try {
      await axios.put(`${API_BASE_URL}/api/users/profile`, payload, { headers });
      window.alert("Home size updated successfully!");
      router.push("/user-profile");
    } catch (error) {
      window.alert(error.response?.data?.message || "Home size update failed. Please try again.");
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
    <>
      <Header home back title="Edit Home Size" />
      <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
        <HomeSizeComponent homeSize={homeSize} setHomeSize={setHomeSize} />
        <button
          onClick={handleUpdateHomeSize}
          style={{
            marginTop: 20,
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 5,
          }}
        >
          Update Home Size
        </button>
      </div>
      <Footer />
    </>
  );
}
