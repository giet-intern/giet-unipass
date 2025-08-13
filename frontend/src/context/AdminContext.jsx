import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext({
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(v);
  }, []);

  const login = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
