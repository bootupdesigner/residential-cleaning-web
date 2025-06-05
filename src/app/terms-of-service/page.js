"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import LayoutWrapper from "../layout-client";

export default function TermsOfService() {
  return (
    <LayoutWrapper>
      <Header back home booking title={'Terms of Service'} />

      <div className="container">
        
        <p>Effective Date: Januaray 1, 2025</p>
        <p>
          By using the JMAC Cleaning Services website and booking platform, you
          agree to the following terms:
        </p>

        <h2>1. Booking Policy</h2>
        <p>
          Appointments must be booked at least 3 hours in advance. A $25 deposit
          is required to confirm your booking.
        </p>

        <h2>2. Cancellation Policy</h2>
        <p>
          Appointments must be cancelled at least 5 hours in advance. Late
          cancellations will forfeit the deposit.
        </p>

        <h2>3. Payments</h2>
        <p>
          Payments are processed securely through Stripe. We do not store your
          credit card information.
        </p>

        <h2>4. User Responsibilities</h2>
        <ul>
          <li>Provide accurate contact and service details</li>
          <li>Be present at the service location during the scheduled time</li>
          <li>Abide by our policies regarding access and conduct</li>
        </ul>

        <h2>5. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of our site
          indicates acceptance of the updated terms.
        </p>
      </div>
    </LayoutWrapper>
  );
}
