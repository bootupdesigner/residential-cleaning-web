// app/layout.js (server component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css'
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "JMAC Cleaning Services",
  description: "Book and manage your cleanings easily online",
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
