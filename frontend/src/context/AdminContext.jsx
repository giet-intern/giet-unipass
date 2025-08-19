import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext({
  isAdmin: false,
  username: "",
  login: (username) => {},
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

  const login = (username) => {
    setIsAdmin(true);
    setUsername(username);
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setIsAdmin(false);
    setUsername("");
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
