'use client'
import { useState, useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, MapPin, Clock } from 'lucide-react'
import { UserCredentials } from '../../components/usercontext/UserCredentialsProvider'

export default function ProfilePage() {
  const { username, usermailid, busstart, busstop } = useContext(UserCredentials);
  const [age, setAge] = useState(null);

  async function fetchprofile() {
    const response = fetch(`http://localhost:8000/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age
      }),
    })
    const data = await response.json()
    if (response.ok) {
      setAge(age)
    } else {
      console.error("Error fetching profile:", data.detail);
    }
  }

  fetchprofile()


  const user = {
    user_id: "BMTC123456",
    user_name: username,
    user_start_stop: busstart,
    user_end_stop: busstop,
    email: usermailid,
    age: age,
    notifications: true,
    favoriteRoutes: [
      { id: 1, name: "500K", from: "Majestic", to: "Whitefield" },
      { id: 2, name: "401", from: "Shivajinagar", to: "Electronic City" },
    ],
    recentSearches: [
      { id: 1, from: "Indiranagar", to: "MG Road", date: "2024-03-01" },
      { id: 2, from: "Koramangala", to: "Hebbal", date: "2024-02-28" },
    ],
    busPass: {
      type: "Monthly",
      validUntil: "2024-03-31",
      remainingDays: 15,
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#15151a] text-gray-100 p-8 ">
      <Card className="max-w-4xl mx-auto bg-[#0c0c0f] text-gray-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{username ? `${username}'s Profile` : 'My Profile'}</CardTitle>
          <CardDescription>Manage your account and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info" className="mx-4 rounded-xl hover:bg-gray-750 focus:ring outline outline-offset-2 outline-blue-200">Personal Info</TabsTrigger>
              <TabsTrigger value="routes" className="mx-4 rounded-xl hover:bg-gray-750 focus:ring outline outline-offset-2 outline-blue-200">Routes & Searches</TabsTrigger>
              <TabsTrigger value="pass" className="mx-4 rounded-xl hover:bg-gray-750 focus:ring outline outline-offset-2 outline-blue-200">Bus Pass</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user_id">User ID</Label>
                    <Input id="user_id" value={user.user_id} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="user_name">Name</Label>
                    <Input id="user_name" value={user.user_name} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email} readOnly className="text-black bg-gray-750 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={user.age} readOnly className="text-black bg-gray-750 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_stop">Usual Start Stop</Label>
                    <Input id="start_stop" value={user.user_start_stop} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="end_stop">Usual End Stop</Label>
                    <Input id="end_stop" value={user.user_end_stop} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                </div>
              </div>
            </TabsContent>
            <TabsContent value="routes" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Favorite Routes</h3>
                <ul className="space-y-2">
                  {user.favoriteRoutes.map(route => (
                    <li key={route.id} className="border-2 bg-gray-750 p-3 rounded-xl flex items-center">
                      <Bus className="mr-2" />
                      <span>{route.name}: {route.from} to {route.to}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
                <ul className="space-y-2">
                  {user.recentSearches.map(search => (
                    <li key={search.id} className="border-2 bg-gray-750 p-3 rounded-xl rounded-xl flex items-center">
                      <MapPin className="mr-2" />
                      <span>{search.from} to {search.to}</span>
                      <Clock className="ml-auto mr-2" />
                      <span>{search.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="pass" className="space-y-4">
              <Card className="bg-gray-750">
                <CardHeader>
                  <CardTitle className="text-xl">Your Bus Pass</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{user.busPass.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Until:</span>
                      <span>{user.busPass.validUntil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Days:</span>
                      <span>{user.busPass.remainingDays}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
