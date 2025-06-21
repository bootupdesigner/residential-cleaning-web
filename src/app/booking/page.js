"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    useStripe,
    useElements,
    CardElement,
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../../../components/Header";
import { API_BASE_URL } from "../../../lib/config";
import LayoutWrapper from "../layout-client";
import Form from 'react-bootstrap/Form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const addOnsList = [
    { id: "windows", name: "Window Cleaning", price: 35 },
    { id: "stove", name: "Stove/Oven Cleaning", price: 15 },
    { id: "ceiling_fan", name: "Ceiling Fan Cleaning", price: 15 },
    { id: "baseboards", name: "Baseboards", price: 70 },
    { id: "doors", name: "Doors", price: 25 },
];

function BookingForm({ stripe, elements }) {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availability, setAvailability] = useState({});
    const [availableTimes, setAvailableTimes] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);
    const [payInFull, setPayInFull] = useState(false);

    const calculateTotal = () => {
        const base = user?.cleaningPrice || 0;
        const addOns = addOnsList
            .filter((a) => selectedAddOns.includes(a.id))
            .reduce((sum, a) => sum + a.price, 0);
        return base + addOns;
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                router.replace("/signin");
                return;
            }

            const headers = { Authorization: `Bearer ${token}` };

            try {
                const profileRes = await axios.get(`${API_BASE_URL}/api/users/profile`, {
                    headers,
                });
                setUser(profileRes.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    alert("Session expired. Please sign in again.");
                    localStorage.removeItem("authToken");
                    router.push("/signin");
                } else {
                    console.error("Profile error:", err);
                }
            }

            try {
                const availRes = await axios.get(`${API_BASE_URL}/api/admin/get-availability`, {
                    headers,
                });
                const data = availRes.data.availability || {};
                setAvailability(data);

                const today = new Date();
                today.setHours(0, 0, 0, 0); // strip time

                const validDates = Object.keys(data).filter((date) => {
                    const dateObj = new Date(date + "T00:00:00");
                    return (
                        Array.isArray(data[date]) &&
                        data[date].length > 0 &&
                        dateObj >= today
                    );
                });

                setAvailableDates(validDates);
            } catch (err) {
                if (err.response?.status === 401) {
                    alert("Access denied. Please log in again.");
                    localStorage.removeItem("authToken");
                    router.push("/signin");
                } else {
                    console.error("Availability fetch error:", err);
                }
            }
        };

        fetchData();
    }, [router]);

    useEffect(() => {
        if (selectedDate && availability[selectedDate]) {
            setAvailableTimes(availability[selectedDate]);
        } else {
            setAvailableTimes([]);
        }
    }, [selectedDate, availability]);

    const handlePayment = async () => {
        console.log("🔘 Confirm Booking button clicked");

        if (!stripe || !elements) {
            console.warn("❌ Stripe or Elements not ready");
            return;
        }

        // Wait for CardElement to mount
        const card = elements.getElement(CardElement);
        if (!card) {
            console.warn("❌ CardElement not mounted yet — try again shortly");
            alert("Payment form is still loading. Please wait a moment and try again.");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be signed in.");
            return;
        }

        const userId = user?._id || user?.id;
        if (!userId) {
            alert("User information not loaded. Please refresh.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert("Please select date and time");
            return;
        }

        setLoading(true);

        try {
            const totalPrice = calculateTotal();

            const { data } = await axios.post(
                `${API_BASE_URL}/api/payment/pay`,
                {
                    userId,
                    selectedAddOns,
                    totalPrice: calculateTotal(),
                    payInFull,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card },
            });

            if (result.error) {
                alert(result.error.message);
                return;
            }

            await axios.post(
                `${API_BASE_URL}/api/bookings/book`,
                { userId, selectedDate, selectedTime, addOns: selectedAddOns },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Booking Confirmed!");
            router.push(
                `/booking-confirmed?selectedDate=${encodeURIComponent(selectedDate)}&selectedTime=${encodeURIComponent(selectedTime)}`
            );
        } catch (error) {
            alert("Payment or booking failed: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };


    const userId = user?._id || user?.id;

    return (
        <div>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    handlePayment();
                }}
                className="p-4"
                style={{ maxWidth: 600, margin: "auto" }}>
                <h2 className="mb-4">Book Your Cleaning</h2>

                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Select a Date</Form.Label>
                    <Form.Select
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime("");
                        }}
                    >
                        <option value="">Choose a Date</option>
                        {availableDates.map((date) => (
                            <option key={date} value={date}>
                                {new Intl.DateTimeFormat("en-US", {
                                    weekday: "short",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }).format(new Date(date + "T00:00:00"))}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTime">
                    <Form.Label>Select a Time</Form.Label>
                    <Form.Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                        <option value="">Select Time</option>
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Add-On Services</Form.Label>
                    {addOnsList
                        .filter((addOn) => addOn.id !== "ceiling_fan")
                        .map((addOn) => (
                            <Form.Check
                                key={addOn.id}
                                type="checkbox"
                                label={`${addOn.name} (+$${addOn.price})`}
                                checked={selectedAddOns.includes(addOn.id)}
                                onChange={() =>
                                    setSelectedAddOns((prev) =>
                                        prev.includes(addOn.id)
                                            ? prev.filter((id) => id !== addOn.id)
                                            : [...prev, addOn.id]
                                    )
                                }
                            />
                        ))}
                </Form.Group>

                <Form.Check
                    type="checkbox"
                    id="payInFull"
                    label="Pay Full Amount Now"
                    checked={payInFull}
                    onChange={(e) => setPayInFull(e.target.checked)}
                    className="mb-3"
                />

                <Form.Group className="mb-3" controlId="cardInfo">
                    <Form.Label>Card Info</Form.Label>
                    <div className="border rounded p-3">
                        <CardElement
                            onChange={(event) => {
                                setCardComplete(event.complete);
                            }}
                        />
                    </div>
                </Form.Group>

                <h4 className="mt-4">
                    Total Due Now: ${payInFull ? calculateTotal() : 25}
                </h4>
                <p>Total Cleaning Price: ${calculateTotal()}</p>

                <div className="d-grid">
                    <button
                        className="btn btn-primary mt-3"
                        type="submit"
                        disabled={
                            loading ||
                            !user ||
                            !userId ||
                            !selectedDate ||
                            !selectedTime ||
                            !cardComplete
                        }
                    >
                        {loading ? "Processing..." : "Confirm Booking"}
                    </button>
                </div>
            </Form>
        </div>
    );
}

function BookingFormWithStripe() {
    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
        return <p>Loading payment form...</p>;
    }

    return <BookingForm stripe={stripe} elements={elements} />;
}

export default function BookingPage() {
    return (
        <Elements stripe={stripePromise}>
            <LayoutWrapper>
                <Header title="Schedule a Cleaning" booking={false} />
                <div className="container">
                    <BookingFormWithStripe />
                </div>
            </LayoutWrapper>
        </Elements>
    );
}
