"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";

export default function PrivacyPolicy() {
    return (
      <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
        <Header back home booking/>
        <h1>Privacy Policy</h1>
        <p>Effective Date: [Insert Date]</p>
        <p>
          This Privacy Policy explains how JMAC Cleaning Services collects, uses,
          and protects your personal information when you use our website and
          services.
        </p>
  
        <h2>Information We Collect</h2>
        <ul>
          <li>Contact details (name, email, phone)</li>
          <li>Service address and home size details</li>
          <li>Payment and booking history (via Stripe)</li>
          <li>Device and log data (for analytics and security)</li>
        </ul>
  
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process bookings and payments</li>
          <li>To send booking confirmations via email</li>
          <li>To improve our services and communication</li>
          <li>To comply with legal requirements</li>
        </ul>
  
        <h2>Third-Party Services</h2>
        <p>
          We use third-party services like Stripe (for payments), Google (for email delivery), and analytics tools. These services may collect data in accordance with their own policies.
        </p>
  
        <h2>Your Rights</h2>
        <p>
          You may request access to, or deletion of, your personal data by
          contacting us at <strong>[Insert Contact Email]</strong>.
        </p>
  
        <h2>Changes</h2>
        <p>
          We may update this policy occasionally. Please check back for updates.
        </p>
      </div>
    );
  }
  