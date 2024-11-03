// layout.js
"use client";
import localFont from "next/font/local";
import "./globals.css";
import { TopNavBar } from "@/components/navbar";
import { UserCredentialsProvider } from "../components/usercontext/UserCredentialsProvider";

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
    <html>
      <head>
        <body>
          <UserCredentialsProvider>
            <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <TopNavBar />
              {children}
            </div>
          </UserCredentialsProvider>
        </body>
      </head>
    </html>
  );
}
