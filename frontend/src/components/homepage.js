import { Button } from "@/components/ui/button";
import { BotNavBar } from '@/components/navbar';
import Link from 'next/link';
import TypeIt from 'typeit-react';

export default function HomePage() {
  return <main className="flex flex-col items-center justify-center h-full p-4 bg-[#15151a]">
    <div className="text-center space-y-6 max-w-2xl">
      <TypeIt className="text-4xl font-bold text-gray-100">
        Find your <span className="text-cyan-500">BMTC Bus</span>
      </TypeIt>
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
}
