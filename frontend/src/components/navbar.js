import { Bus, Home, Search, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function BotNavBar() {
  return (<div className="bg-black border-gray-200 fixed bottom-0 w-full">
    <div className="flex justify-around p-4">
      <Link href="/">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Home className="h-6 w-6" />
          <span className="text-sm">Home</span>
        </button>
      </Link >
      <Link href="/search">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Search className="h-6 w-6" />
          <span className="text-sm">Search</span>
        </button>
      </Link>
      <Link href="/aboutus">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Store className="h-6 w-6" />
          <span className="text-sm">About Us</span>
        </button>
      </Link>
    </div>
  </div>);
}

function TopNavBar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6" />
          <span className="text-xl font-bold">BMTC Query</span>
        </div>
      </Link>
      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="ghost" className="bg-white text-black hover:bg-gray-100 rounded-xl">
            Login
          </Button>
        </Link>
        <Button className="bg-white text-black hover:bg-gray-100 rounded-xl">
          Sign Up
        </Button>
      </div>
    </nav>);
}

export { TopNavBar, BotNavBar };
