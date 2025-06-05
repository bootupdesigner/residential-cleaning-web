"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import { API_BASE_URL } from "../../../lib/config";
import AddressComponent from "../../../components/AddressComponent";
import LayoutWrapper from "../layout-client";

export default function EditAddressPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        homeType: "apartment",
    });
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Fetch user profile on mount
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
                setAddress({
                    street: res.data.serviceAddress || "",
                    city: res.data.city || "",
                    state: res.data.state || "",
                    zipCode: res.data.zipCode || "",
                    homeType: res.data.homeType || "apartment",
                });
            } catch (error) {
                router.replace("/signin");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleUpdateAddress = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.alert("Authentication error. Please sign in again.");
            router.push("/signin");
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const payload = {};

        if (address.street) payload.serviceAddress = address.street;
        if (address.city) payload.city = address.city;
        if (address.state) payload.state = address.state;
        if (address.zipCode) payload.zipCode = address.zipCode;
        if (address.homeType) payload.homeType = address.homeType;

        if (Object.keys(payload).length === 0) {
            window.alert("No valid fields provided for update.");
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/api/users/profile`, payload, { headers });
            window.alert("Address updated successfully!");
            router.push("/user-profile");
        } catch (error) {
            window.alert(error.response?.data?.message || "Address update failed. Please try again.");
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
            <Header home back title="Edit Address" />
            <div className="container py-5">
                <AddressComponent address={address} setAddress={setAddress} />
                <button
                    onClick={handleUpdateAddress}
                    style={{
                        marginTop: 20,
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: 5,
                    }}
                >
                    Update Address
                </button>
            </div>
        </LayoutWrapper>
    );
}
