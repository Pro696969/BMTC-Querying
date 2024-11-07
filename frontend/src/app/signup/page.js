'use client'

import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCredentials } from '../../components/usercontext/UserCredentialsProvider'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function SignUp() {
    const { setUsermailid, setBusstart, setBusstop, setBdate } = useContext(UserCredentials)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        bus_start: '',
        bus_stop: '',
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
                    busstart: formData.bus_start,
                    busstop: formData.bus_stop,
                    bdate: formData.bdate
                }),
            })

            const data = await response.json()
            if (data.signed === "1") {
                setUsermailid(formData.email)
                setBusstart(formData.bus_start)
                setBusstop(formData.bus_stop)
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
            <div className="w-full max-w-4xl p-8 space-y-6 bg-black rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-white">Register for BMTC Bus Query</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
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
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bdate" className="text-white">Date of Birth</Label>
                                <DatePicker
                                    selected={formData.bdate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select your date of birth"
                                    className="w-full bg-gray-700 text-white border-gray-700 rounded-xl p-2"
                                    wrapperClassName="w-full"
                                    calendarClassName="bg-gray-800 text-white border-gray-700"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bus_start" className="text-white">Bus Start</Label>
                                <Input
                                    id="bus_start"
                                    name="bus_start"
                                    type="text"
                                    required
                                    className="w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bus_stop" className="text-white">Bus Stop</Label>
                                <Input
                                    id="bus_stop"
                                    name="bus_stop"
                                    type="text"
                                    required
                                    className="w-full bg-gray-700 text-white border-gray-700 rounded-xl"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button type="submit" className="px-8 py-2 text-white hover:text-blue-500 hover:border-blue-500 font-semibold border-white border-2 rounded-xl">
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