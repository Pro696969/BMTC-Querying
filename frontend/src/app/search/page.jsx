'use client'

import { useState, useContext, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { redirect } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserCredentials } from '../../components/usercontext/UserCredentialsProvider'
import { Star } from 'lucide-react'

const Routes = ({ routes, starredRoutes, onStarRoute }) => {
  if (routes.length === 0) {
    return <p className="text-center mt-4 text-gray-400">No routes found. Try a different search term.</p>
  }
  return (
    <div className="overflow-hidden w-full max-w-4xl mx-auto rounded-xl border border-gray-700">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-[#0c0c0f]">
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Star</TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Route Number</TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">From</TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">To</TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Distance</TableHead>
            <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route, index) => (
            <TableRow
              key={index}
              className={`border-t border-gray-700 hover:bg-[#1c1c24] ${index === routes.length - 1 ? '' : 'border-b border-gray-700'
                }`}
            >
              <TableCell className="px-4 py-2 text-sm font-medium text-gray-100">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onStarRoute(route)}
                  aria-label={starredRoutes.some(r => r.route_no === route.route_no) ? "Unstar route" : "Star route"}
                >
                  <Star
                    className={`h-5 w-5 ${starredRoutes.some(r => r.route_no === route.route_no) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                  />
                </Button>
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-medium text-gray-100">{route.route_no}</TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-300">{route.origin}</TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-300">{route.destination}</TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-300">{route.distance} KM</TableCell>
              <TableCell className="px-4 py-2 text-sm text-gray-300">{route.time/60} Min</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function BusSearch() {
  const [searchResults, setSearchResults] = useState([])
  const [chosen, setChosen] = useState('Filter By')
  const [starredRoutes, setStarredRoutes] = useState([])
  const { username } = useContext(UserCredentials)

  if (!username) {
    redirect("/login")
  }

  const handleSearch = (event) => {
    if (event.key !== "Enter") {
      return
    }

    const { value } = event.target
    if (value.length === 0) {
      return
    }

    fetch(`http://localhost:8000/route/${chosen}/${value}`)
      .then((res) => res.json())
      .then((json) => {
        setSearchResults(json)
      })
  }

  const handleStarRoute = useCallback((route) => {
    setStarredRoutes((prevStarred) => {
      const isAlreadyStarred = prevStarred.some(r => r.route_no === route.route_no)
      if (isAlreadyStarred) {
        return prevStarred.filter(r => r.route_no !== route.route_no)
      } else {
        return [...prevStarred, route]
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center bg-[#15151a] w-full min-h-screen">
      <div className="mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Fuzzy Search</h1>
        <div className="mb-6 w-full flex flex-row max-w-lg">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-fit rounded-xl px-4 mx-2 hover:ring-opacity-50 hover:border-sky-500 hover:border-2 transition-all duration-100 ease-in-out">{chosen}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black rounded-xl">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setChosen("Route No")}>Route No</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChosen("Origin")}>Origin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChosen("Destination")}>Destination</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="text"
            placeholder="Search by route number, from, to, or via"
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 rounded-xl border-solid border-gray-700 bg-[#0c0c0f] text-gray-100 placeholder-gray-400 focus:border-sky-500 focus:border-2 transition-all duration-100 ease-in-out focus:ring-opacity-50"
          />
        </div>
        <Routes routes={searchResults} starredRoutes={starredRoutes} onStarRoute={handleStarRoute} />
      </div>
    </div>
  )
}