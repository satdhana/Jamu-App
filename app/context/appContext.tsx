"use client";
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State Login
  const [myCourses, setMyCourses] = useState([
    { id: 'kunyit-asam', name: 'Kunyit Asam', day: 4, totalDays: 7, status: 'In Progress' }
  ]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const addCourse = (jamu: any) => {
    setMyCourses((prev) => [...prev, { ...jamu, day: 1, totalDays: 7, status: 'In Progress' }]);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout, myCourses, addCourse }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};