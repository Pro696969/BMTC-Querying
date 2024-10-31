// function Home() {
//     return (
//         <h1 className="text-2xl text-white font-bold text-center">Hello World</h1>
//     )
// }

// export default Home;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Bus, Home, Search, User } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6" />
          <span className="text-xl font-bold">BusQuery</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-blue-700">
            Login
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Bus Route
          </h1>
          <p className="text-lg text-gray-600">
            Real-time bus tracking and route information at your fingertips
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto border rounded-lg">
            Start Searching
          </Button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <Home className="h-6 w-6" />
            <span className="text-sm">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <Search className="h-6 w-6" />
            <span className="text-sm">Search</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
            <User className="h-6 w-6" />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;