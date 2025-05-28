"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../../components/Footer";
import { AuthProvider } from "../../lib/useAuth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function LayoutWrapper({ children }) {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        {children}
        <Footer />
      </Elements>
    </AuthProvider>
  );
}
