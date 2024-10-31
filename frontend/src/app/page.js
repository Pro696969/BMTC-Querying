'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { BotNavBar } from '@/components/navbar';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[#15151a]">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-100">
            Find Your <span className="text-blue-500">Bus</span> Route
          </h1>
          <p className="text-lg text-gray-400">
            Real-time bus tracking and route information at your fingertips
          </p>
          <Link href="/search">
            <Button className="bg-black text-lg p-5 h-auto border border-2 rounded-2xl hover:text-blue-500 hover:border-blue-400 mt-5">
              Start Searching
            </Button>
          </Link>
        </div>
        <BotNavBar />
      </main>
    </div>
  );
};

export default HomePage;
