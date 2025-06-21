"use client";

import React from 'react'
import Image from "next/image";
import toilet from '../public/toilet.jpeg';


function WelcomeSection({ user, router, handleBookingPress, isLoading }) {


    return (
        <div>
            <div className='contentRow'>
                <div className="content-frame" style={{
                    position: "relative",
                    width: "400px",
                    margin: "auto",
                    borderRadius: "5px",
                    overflow: "hidden", 
                }}>

                    <Image
                        src='https://images.pexels.com/photos/4239067/pexels-photo-4239067.jpeg'
                        alt="residential home cleaning"
                        fill
                        quality={75}
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            zIndex: 0,
                        }}
                    />

                    <div style={{
                        position: "relative",
                        zIndex: 1,
                        padding: "2rem",
                        backgroundColor: "#ffffff90",
                    }}>
                        <h3 style={{ color: 'black', textAlign: 'center' }}>House Keeping 7 Days a Week.</h3>
                        <p style={{ color: 'black', textAlign: 'center' }}><strong>Same Day Booking Available!</strong></p>
                        <ul>
                            <li>Move-in Cleaning</li>
                            <li>Standard Surface Cleaning</li>
                            <li>Deep Cleaning Add-ons</li>
                            <li>Houses</li>
                            <li>Apartments</li>
                            <li>Offices</li>
                        </ul>
                        <p style={{ color: 'black', textAlign: 'center' }}><strong>Servicing Miami-Dade and Broward County</strong></p>
                    </div>
                </div>

                <div>
                    <div className='content-frame'>
                        <p style={{ color: 'black', }} >
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