import { Button } from "@/components/ui/button";
import { BotNavBar } from '@/components/navbar';
import Link from 'next/link';
import TypeIt from 'typeit-react';

export default function HomePage() {
  return <main className="flex flex-col items-center justify-center h-full p-4 bg-[#15151a]">
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
}
