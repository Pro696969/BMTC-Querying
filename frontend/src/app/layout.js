"use client"
import localFont from "next/font/local";
import "./globals.css";
import { TopNavBar } from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BMTC Query</title>
        <meta name="description" content="Generated by Kiran & KK ❤"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
