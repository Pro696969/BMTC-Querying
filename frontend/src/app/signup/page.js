'use client'

import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCredentials } from '../../components/usercontext/UserCredentialsProvider'
import Link from 'next/link'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function SignUp() {
  const { setUsermailid, setBdate } = useContext(UserCredentials)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    bdate: null,
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      bdate: date
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Format date as YYYY-MM-DD or empty string if no date
    const formattedDate = formData.bdate ? 
      `${formData.bdate.$y}-${formData.bdate.$M + 1}-${formData.bdate.$D}` : 
      ''

    try {
      const response = await fetch(`http://localhost:8000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputUsername: formData.username,
          password: formData.password,
          emailid: formData.email,
          bdate: formattedDate
        }),
      })

      const data = await response.json()
      if (data.signed === "1") {
        setUsermailid(formData.email)
        setBdate(formData.bdate)
        setMessage(data.message)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error("Error during sign-up:", error)
      setMessage("Sign-up failed. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#15151a]">
      <div className="flex flex-col items-center max-w-4xl p-8 space-y-6 bg-black rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white">Register for BMTC Bus Query</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-6" autoComplete="off">
          <div className="w-3/4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email-id"
                value={formData.email}
                required
                className="w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                required
                className="w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bdate" className="text-white">Date of Birth</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.bdate}
                  onChange={handleDateChange}
                  className="w-full"
                  slotProps={{
                    textField: {
                      className: "w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                    }
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                      backgroundColor: '#374151',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              className="px-8 py-2 text-white hover:text-blue-500 hover:border-blue-500 font-semibold border-white border-2 rounded-xl"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        {message && <p className="text-white mt-4 text-center">{message}</p>}
      </div>
    </div>
  )
}