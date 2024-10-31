'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { BotNavBar } from '@/components/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
const HomePage = () => {
  return (
    <div className="h-screen">
      <motion.div
        animate={{
          x: ["-91%", "400%"],  // Move from 0% to 100% of the container width and back to 0%
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-1/4 w-1/3 h-1/6 invert"
      >
        <Image src="/bus.svg" alt="bus" fill />
      </motion.div>
      <main className="flex flex-col items-center justify-center h-full p-4 bg-[#15151a]">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-100">
            Find Your <span className="text-blue-500">Bus</span> Route
          </h1>
          <p className="text-lg text-gray-400">
            Real-time bus tracking and route information at your fingertips
          </p>
          <Link href="/search">
            <Button className="bg-black text-lg p-5 h-auto border border-2 rounded-2xl hover:text-blue-500 hover:border-blue-400 mt-5 font-bold">
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
