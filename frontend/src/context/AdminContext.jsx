import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdminLoggedIn(false);

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
