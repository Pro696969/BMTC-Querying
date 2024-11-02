import { Bus, Home, Search, Store, Headset } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCredentials } from "@/app/page";
import { useContext } from "react";

const BotNavBar = () => {
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
      <Link href="/customercare">
        <button className="flex flex-col items-center text-gray-200 hover:text-blue-400">
          <Headset className="h-6 w-6" />
          <span className="text-sm">Customer Care</span>
        </button>
      </Link>
    </div>
  </div>);
}

const NotLoggedIn = () => {
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

const LoggedIn = ({username}) => {
  return <div className="flex gap-4">
    <div className="bg-white p-1.5 font-semibold text-black rounded-xl">
      {username}
    </div>
    <div className="bg-white p-1.5 font-semibold text-black rounded-xl">
      Profile
    </div>
  </div>
}

const TopNavBar = () => {
  const { username } = useContext(UserCredentials);
  let loginItems;
  if(username) {
    loginItems = <LoggedIn username={username}/>
  } else {
    loginItems = <NotLoggedIn />
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
