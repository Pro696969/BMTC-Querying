'use client'
import busRoutes from "./bus_routes.json"
import Fuse from 'fuse.js'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TypeIt from "typeit-react"

export default function BusSearch() {
  const [searchResults, setSearchResults] = useState(busRoutes)

  const fuse = new Fuse(busRoutes, {
    keys: ['routeNumber', 'from', 'to', 'via'],
    threshold: 0.3,
  })

  const handleSearch = (event) => {
    const { value } = event.target
    if (value.length === 0) {
      setSearchResults(busRoutes)
      return
    }

    const results = fuse.search(value)
    setSearchResults(results.map((result) => result.item))
  }

  return (
    <div className="flex flex-col items-center bg-[#15151a] w-full min-h-screen">
      <div className="mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          <TypeIt className="text-4xl font-bold text-gray-100" getBeforeInit={(instance) => {
            instance
              .options({ speed: 50 })
              .type(`BMTC Route <span style="color: rgb(6 182 212);"> Search</span>`)
              .pause(250)
              .pause(700)
              .options({ speed: 2, lifeLike: true })
              .delete(6)
              .pause(700)
              .options({ speed: 2, lifeLike: true })
              .type(`<span style="color: rgb(6 182 212);">Fuzzy Search</span>`)
              .pause(700)
            return instance;
          }} 
            options={{ afterComplete: (instance) => instance.destroy() }}
          />
        </h1>
        <div className="mb-6 w-full max-w-lg mx-auto">
          <Input
            type="text"
            placeholder="Search by route number, from, to, or via"
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-xl border-solid border-gray-700 bg-[#0c0c0f] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-sky-500 focus:border-2 transition-all duration-100 ease-in-out focus:ring-opacity-50"
          />
        </div>
        <div className="overflow-hidden w-full max-w-4xl mx-auto rounded-xl border border-gray-700">
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-[#0c0c0f]">
                <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Route Number</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">From</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">To</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-medium text-gray-300">Via</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((route, index) => (
                <TableRow 
                  key={route.id} 
                  className={`border-t border-gray-700 hover:bg-[#1c1c24] ${
                    index === searchResults.length - 1 ? '' : 'border-b border-gray-700'
                  }`}
                >
                  <TableCell className="px-4 py-2 text-sm font-medium text-gray-100">{route.routeNumber}</TableCell>
                  <TableCell className="px-4 py-2 text-sm text-gray-300">{route.from}</TableCell>
                  <TableCell className="px-4 py-2 text-sm text-gray-300">{route.to}</TableCell>
                  <TableCell className="px-4 py-2 text-sm text-gray-300">{route.via}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {searchResults.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No routes found. Try a different search term.</p>
        )}
      </div>
    </div>
  )
}