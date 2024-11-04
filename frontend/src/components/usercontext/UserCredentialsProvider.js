"use client";

import React, { createContext, useState } from 'react';

export const UserCredentials = createContext();

export const UserCredentialsProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [usermailid, setUsermailid] = useState('');

  return (
    <UserCredentials.Provider value={{ username, setUsername, usermailid, setUsermailid }}>
      {children}
    </UserCredentials.Provider>
  );
};
