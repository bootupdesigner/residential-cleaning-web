"use client";

import React, { Suspense, useState, useEffect } from "react";
import BookingConfirmedContent from "../../../components/BookingConfirmedContent";

export default function BookingConfirmed() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null; // ❌ prevents SSR mismatch


  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <BookingConfirmedContent />
    </Suspense>
  );
}
