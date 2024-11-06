"use client";

import React, { createContext, useState } from 'react';

export const UserCredentials = createContext();

export const UserCredentialsProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [usermailid, setUsermailid] = useState('');
  const [busstart, setBusstart] = useState('');
  const [busstop, setBusstop] = useState('');

  return (
    <UserCredentials.Provider value={{
      username, setUsername, usermailid, setUsermailid, busstart, setBusstart, busstop, setBusstop
    }}>
      {children}
    </UserCredentials.Provider>
  );
};
