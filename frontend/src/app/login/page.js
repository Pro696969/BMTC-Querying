"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Sign in
              </button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
