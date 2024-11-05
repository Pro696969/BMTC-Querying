"use client"
import { Bus, Home, Store, Headset, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserCredentials } from "@/components/usercontext/UserCredentialsProvider";

const BotNavBar = () => {
  return (<div className="bg-black border-gray-200 fixed bottom-0 w-full">
    <div className="flex justify-around p-4">
      <Link href="/">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Home className="h-6 w-6" />
          <span className="text-sm">Home</span>
        </button>
      </Link >
      <Link href="/profile">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <CircleUserRound className="h-6 w-6" />
          <span className="text-sm">Profile</span>
        </button>
      </Link>
      <Link href="/customercare">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Headset className="h-6 w-6" />
          <span className="text-sm">Customer Care</span>
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

const NotLoggedIn = ( {username} ) => {
  return <div className="flex gap-4">
    <Button className="bg-white font-semibold text-black hover:bg-gray-100 rounded-xl" asChild>
      <Link href="/login">
        Login
      </Link>
    </Button>
    <Button className="bg-white font-semibold text-black hover:bg-gray-100 rounded-xl" asChild>
      <Link href="/signup">
        Sign Up
      </Link>
    </Button>
  </div>
}

function handleLogOut() {
  const { setUsername } = useContext(UserCredentials);
  setUsername('')
}

const LoggedIn = ({ username }) => {
  return (
    <div className="font-medium text-xl normal-case text-white-500 hover:text-blue-500 transition duration-300 ease-in-out">
      <span className="mx-4 hover:animate-pulse">
        Hello, {username}!
      </span>
      <Button onClick={handleLogOut} className="px-2 bg-white font-semibold text-black hover:bg-gray-100 rounded-xl" asChild>
      <Link href="/">
        Log Out
      </Link>
      </Button>
    </div>
  )
}

const TopNavBar = () => {
  // const { username } = useContext(UserCredentials);
  const { username } = useContext(UserCredentials);
  let loginItems;
  if (username) {
    loginItems = <LoggedIn username={username} />
  } else {
    loginItems = <NotLoggedIn username={username}/>
  }
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Bus className="h-6 w-6" />
          <span className="text-xl font-bold">BMTC Query</span>
        </div>
      </Link>
      {loginItems}
    </nav>);
}

export { TopNavBar, BotNavBar };
