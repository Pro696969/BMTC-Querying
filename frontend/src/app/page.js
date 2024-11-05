"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import HomePage from "@/components/homepage";

const App = () => {
  return (
    <div className="h-screen overflow-hidden">
        <motion.div
          animate={{
            x: ["-91%", "400%"],
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
      <HomePage />
      </div>
  );
};

export default App;
