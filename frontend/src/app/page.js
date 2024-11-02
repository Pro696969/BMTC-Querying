'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BotNavBar } from '@/components/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TypeIt from 'typeit-react';
import { createContext } from 'react';

export const UserCredentials = createContext({username: '', setUsername: null});

const HomePage = () => {
  let [username, setUsername] = useState('');
  return (
    <UserCredentials.Provider value={{username, setUsername}}>
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
            <TypeIt className="text-4xl font-bold text-gray-100" getBeforeInit={(instance) => {
              instance
                .options({ speed: 50 })
                .type(`Find Your <span style="color: rgb(6 182 212);">Bus</span> Route`)
                .pause(500)
                .move(-6)
                .pause(700)
                .options({ speed: 2, lifeLike: true })
                .delete(3)
                .pause(700)
                .options({ speed: 2, lifeLike: true })
                .type(`<span style="color: rgb(6 182 212);">BMTC Bus</span>`)
                .pause(700)
              return instance;
            }}
              options={{ afterComplete: (instance) => instance.destroy() }}
            />
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
    </UserCredentials.Provider>
  );
};

export default HomePage;
