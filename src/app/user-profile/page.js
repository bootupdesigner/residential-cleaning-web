"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../../lib/config";
import Header from "../../../components/Header";
import LayoutWrapper from "../layout-client";
import { Button } from "react-bootstrap";

export default function UserProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasHydrated, setHasHydrated] = useState(false);

    // ✅ Load user data on page load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    router.replace("/signin");
                    return;
                }
                const headers = { Authorization: `Bearer ${token}` };
                const res = await axios.get(`${API_BASE_URL}/api/users/profile`, { headers });
                setUser(res.data);
            } catch (err) {
                console.error("User fetch error:", err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
        setHasHydrated(true);
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm("Are you sure you want to delete your profile? This cannot be undone.")) return;

        try {
            setIsLoading(true);
            const token = localStorage.getItem("authToken");
            const headers = { Authorization: `Bearer ${token}` };

            await axios.delete(`${API_BASE_URL}/api/users/profile`, { headers });

            localStorage.removeItem("authToken");
            window.alert("Your profile has been deleted.");
            router.replace("/");
        } catch (err) {
            console.error("Delete error:", err);
            window.alert("Failed to delete your profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!hasHydrated || isLoading) {
        return <div style={{ padding: 20 }}>Loading...</div>;
    }

    if (!user) {
        return (
            <div style={{ padding: 20 }}>
                <p>User data not found. Please sign in again.</p>
                <button onClick={() => router.push("/signin")}>Sign In</button>
            </div>
        );
    }

    return (
        <LayoutWrapper>
            <Header home back booking title="Profile" />
            <div className="container py-5">

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <h2>Welcome, {user.firstName} {user.lastName}</h2>

                    <Button variant="primary" onClick={() => router.push("/appointments")}>View Appointments</Button>

                    {user.role === "admin" && (
                        <Button variant="success" onClick={() => router.push("/create-availability")}>Manage Availability</Button>
                    )}
                </div>

                {/****** edit profile *******/}

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', alignContent: 'center', marginTop: 20 }}>
                    <div>
                        <strong>Email:</strong>
                        <p>{user.email}</p>
                        <strong>Phone:</strong>
                        <p>{user.phone}</p>
                    </div>

                    <div>
                        <Button variant="outline-info" onClick={() => router.push("/edit-profile")}>Edit Profile</Button>
                    </div>
                </div>
                <hr style={{ color: 'green' }} />


                {/****** edit address *******/}

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', alignContent: 'center', marginTop: 20 }}>
                    <div>
                        <strong>Address:</strong>
                        <p>{user.serviceAddress}<br /> {user.city}, {user.state} {user.zipCode} </p>
                        <strong>Home Type:</strong>
                        <p>{user.homeType}</p>
                    </div>

                    <div>
                        <Button variant="outline-info" onClick={() => router.push("/edit-address")}>Edit Address</Button>
                    </div>
                </div>
                <hr style={{ color: 'green' }} />


                {/****** edit home size *******/}

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', alignContent: 'center', marginTop: 20 }}>
                    <div>
                        <strong>Home Size:</strong>
                        <p>{user.homeSize?.bedrooms} Bed / {user.homeSize?.bathrooms} Bath </p>
                    </div>
                    <div>
                        <Button variant="outline-info" onClick={() => router.push("/edit-home-size")}>Edit Home Size</Button>
                    </div>
                </div>
                <hr style={{ color: 'green', }} />


                {/****** cleaning price *******/}
                <div>
                    <p><strong>Base Price:</strong> ${user.cleaningPrice || 0}</p>
                </div>


                {/****** delete profile button *******/}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', }} >
                    <a
                        className="btn btn-outline-danger"
                        onClick={handleDeleteProfile}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete Profile"}
                    </a>
                </div>
            </div>
        </LayoutWrapper >
    );
}
