'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Bus, Home, Search, Store } from "lucide-react";
import { useRouter } from 'next/navigation';


const HomePage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6" />
          <span className="text-xl font-bold">BusQuery</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="bg-white text-black hover:bg-gray-100 rounded-xl" onClick={() => router.push("/login") }>
            Login
          </Button>
          <Button className="bg-white text-black hover:bg-gray-100 rounded-xl">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[#15151a]">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-100">
            Find Your <span className="text-blue-500">Bus</span> Route
          </h1>
          <p className="text-lg text-gray-400">
            Real-time bus tracking and route information at your fingertips
          </p>
          <Button className="bg-black text-lg p-5 h-auto border border-2 rounded-2xl hover:text-blue-500 hover:border-blue-400">
            Start Searching
          </Button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="bg-black border-gray-200 fixed bottom-0 w-full">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
            <Home className="h-6 w-6" />
            <span className="text-sm">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
            <Search className="h-6 w-6" />
            <span className="text-sm">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
            <Store className="h-6 w-6" />
            <span className="text-sm" onClick={() => { router.push("/aboutus") }}>About Us</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
