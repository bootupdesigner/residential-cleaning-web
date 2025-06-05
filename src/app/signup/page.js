"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AddressComponent from "../../../components/AddressComponent";
import HomeSizeComponent from "../../../components/HomeSizeComponent";
import ContactInfoComponent from "../../../components/ContactInfoComponent";
import { API_BASE_URL } from "../../../lib/config";
import { Button, Form,  } from "react-bootstrap";
import Header from "../../../components/Header";
import LayoutWrapper from "../layout-client";

const SignUp = () => {
    const router = useRouter();
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        homeType: "apartment",
    });

    const [homeSize, setHomeSize] = useState({ bedrooms: 1, bathrooms: 1 });
    const [contactInfo, setContactInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });

    const [hasHydrated, setHasHydrated] = useState(false);

useEffect(() => {
  setHasHydrated(true);
}, []);


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) router.replace("/user-profile");
    }, [router]);


if (!hasHydrated) return null;

    const handleSignUp = async () => {
        if (!contactInfo.email || !contactInfo.password) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const payload = {
                firstName: contactInfo.firstName.trim(),
                lastName: contactInfo.lastName.trim(),
                email: contactInfo.email.trim(),
                phone: contactInfo.phone.trim(),
                password: contactInfo.password,
                serviceAddress: address.street.trim(),
                city: address.city.trim(),
                state: address.state.trim(),
                zipCode: String(address.zipCode),
                homeType: address.homeType?.trim() || "apartment",
                homeSize: {
                    bedrooms: parseInt(homeSize.bedrooms, 10),
                    bathrooms: parseInt(homeSize.bathrooms, 10),
                },
            };

            console.log("📦 Payload:", payload);

            await axios.post(`${API_BASE_URL}/api/auth/signup`, payload);
            const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, { email: contactInfo.email, password: contactInfo.password });
            localStorage.setItem("authToken", loginResponse.data.token);
            alert("Account created successfully!");
            router.replace("/booking");
        } catch (error) {
            alert(error.response?.data?.message || "Account creation failed. Please try again.");
        }
    };

    return (
        <LayoutWrapper>
            <Header back={true} home={true} title={'Sign Up'} booking={false} />
            <div className="container py-5">
                <Form>
                    <ContactInfoComponent contactInfo={contactInfo} setContactInfo={setContactInfo} />
                    <AddressComponent address={address} setAddress={setAddress} />
                    <HomeSizeComponent homeSize={homeSize} setHomeSize={setHomeSize} />
                    <Button onClick={handleSignUp} style={styles.button}>Create Account</Button>
                </Form>
            </div>

        </LayoutWrapper>
    );
};

export default SignUp;

const styles = {
    container: { maxWidth: "400px", margin: "auto", padding: "20px", },
    button: { width: "100%", padding: "10px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};
