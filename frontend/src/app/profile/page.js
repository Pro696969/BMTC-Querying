'use client'
import { useState, useEffect, useContext } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus } from 'lucide-react'
import { UserCredentials } from '@/components/usercontext/UserCredentialsProvider'
import { redirect } from 'next/navigation'

export default function ProfilePage() {
  const { username, usermailid, setUsername } = useContext(UserCredentials);
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [age, setAge] = useState(0)

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/profile?username=${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("User deleted successfully")
        setUsername('')
        redirect('/')
      }
    } catch (error) {
      console.log("Error occured: ", error)
    }
  }

  if (!username) {
    redirect("/login");
  }

  useEffect(() => {
    fetch(`http://localhost:8000/profile?username=${username}`)
      .then((res) => res.json())
      .then((json) => {
        setAge(json.age)
        setFavoriteRoutes(json.favourites)
      })
  }, [])

  const user = {
    busPass: {
      type: "Monthly",
      validUntil: "2024-03-31",
      remainingDays: 15,
    },
  };


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
                    <Label htmlFor="user_name">Name</Label>
                    <Input id="user_name" value={username} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>
                  {age && <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" value={age} readOnly className="text-black bg-gray-750 rounded-xl" />
                  </div>}

                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={usermailid} readOnly className="text-black bg-gray-750 rounded-xl" />
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
                  <div className="flex flex-row">
                    <button className="px-2 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
                      onClick={handleDelete}>Delete User</button>
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
                  {favoriteRoutes.map(route => (
                    <li key={route.route_id} className="border-2 bg-gray-750 p-3 rounded-xl flex items-center">
                      <Bus className="mr-2" />
                      <span>{route.route_no}: {route.origin} to {route.destination}</span>
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
  );
}
