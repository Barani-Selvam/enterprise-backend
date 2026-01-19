import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export type UserRole = "Admin" | "User" | null;

interface AuthContextType {
  token: string | null;
  username: string | null;
  role: UserRole;
  login: (jwt: string, username: string, role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [role, setRole] = useState<UserRole>(
    localStorage.getItem("role") as UserRole
  );

  const login = (jwt: string, user: string, userRole: UserRole) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("username", user);
    localStorage.setItem("role", userRole ?? "");

    setToken(jwt);
    setUsername(user);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
