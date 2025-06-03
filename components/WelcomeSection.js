"use client";

import React from 'react'

function WelcomeSection({ user, router, handleBookingPress, isLoading }) {


    return (
        <div>
            <div className='contentRow'>

                <div className='welcomeBackgroundImage'>

                    <div className='content-frame' style={{
                        borderRadius: "5px",
                        backgroundColor: "#ffffff50",

                    }}>
                        <h3 style={{ textAlign: 'center', }}>House Keeping 7 Days a Week.</h3>
                        <p style={{ textAlign: 'center', }}><strong>Same Day Booking Available!</strong></p>

                        <ul>
                            <li>Move-in Cleaning</li>
                            <li>Standard Surface Cleaning</li>
                            <li>Deep Cleaning Add-ons</li>
                            <li>Houses</li>
                            <li>Apartments</li>
                            <li>Offices</li>
                        </ul>
                        <p style={{ textAlign: 'center', }}> <strong  >Servicing Miami-Dade and Broward County</strong></p>

                    </div>
                </div>

                <div>
                    <div className='content-frame'>
                        <p >
                            Residential cleaning - Houses, apartments, condos, and townhomes. Customize your cleaning experience with JMAC Cleaning Services starting at only $150 for your 1 bedroom / 1 bathroom home.{" "}
                            {user ? "Book your next cleaning today." : "Sign up for an instant quote."}
                        </p>
                        {user ? (
                            <button onClick={handleBookingPress} style={styles.button} disabled={isLoading}>
                                {isLoading ? "Loading..." : "Book a Cleaning"}
                            </button>
                        ) : (
                            <div>
                                <button
                                    onClick={() => router.push("/signup")}
                                    style={{ ...styles.button, backgroundColor: "#28a745" }}
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={() => router.push("/signin")}
                                    style={{ ...styles.button, backgroundColor: "blue" }}
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WelcomeSection

const styles = {
    container: { maxWidth: "800px", margin: "auto", padding: "20px" },
    content: { padding: "20px", textAlign: "center" },
    image: { width: "100%", borderRadius: "10px", marginBottom: "20px" },
    button: {
        padding: "15px",
        borderRadius: "5px",
        color: "white",
        background: "#007bff",
        border: "none",
        cursor: "pointer",
        margin: "10px 0",
        width: "100%",
    },
};