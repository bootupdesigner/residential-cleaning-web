// app/layout.js (server component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css'
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "JMAC Cleaning Services",
  description: "Local house cleaning professionals. Dedicated to keeping your house, apartment, or office clean at an affordable cost. Residential deep cleanings, we clean your fans, doors, baseboards, and more. Hire us to do your house keeping for you. Call (305)793-7344 for more information about our home cleaning services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
