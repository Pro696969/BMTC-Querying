// UserCredentialsProvider.js
"use client";

import React, { createContext, useState } from 'react';

export const UserCredentials = createContext();

export const UserCredentialsProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserCredentials.Provider value={{ username, setUsername }}>
      {children}
    </UserCredentials.Provider>
  );
};
