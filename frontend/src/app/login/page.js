"use client";
import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { UserCredentials } from '../page';

const LoginPage = () => {
  // const [username, setUsernamestr] = useState('');
  const { username, setUsername } = useContext(UserCredentials);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json()).then((data) => {
      if (data.logged === "1") {
        setUsername(username)
        router.push('/')
        console.log("well done")
      }
      setMessage(data.message)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15151a]">
      <Card className="w-full max-w-md rounded-xl bg-black-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white font-bold text-center">Welcome Back</CardTitle>
          <p className="text-sm text-gray-200 text-center">
            Please log in to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <div className="space-y-2 w-full">
              <div className="relative">
                <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-200" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div className="relative">
                <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-200" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="text-white py-2 hover:text-gray-500 font-semibold border-white border-2 rounded-xl">
              <button
                type="submit"
                className="px-4"
              >
                Login
              </button>
            </div>
            {message && <p className="text-white mt-4">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
