import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext({
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const v = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(v);
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const login = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("username", "hodaiml");
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, username, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
