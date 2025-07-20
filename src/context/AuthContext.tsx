import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  balance: number;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // On mount, optionally restore auth from localStorage to persist between refreshes
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', JSON.stringify({ email, password })) as any;
      setToken(data.token);
      setUser(data.user);

      // Store in localStorage for persistence
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      router.push("/");
    } catch (err: any) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.push("/login");  // redirect to login after logout
  };

  const authContextValue: AuthContextType = { user, token, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
