"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
interface User {
    id: number;
  username: string;
  token: string;
}
interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

 const UserContext = createContext<UserContextType | undefined>(undefined);
 
export { UserContext };
export const UserProvider =  ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
  const saved = localStorage.getItem("user");
  if (saved) setUser(JSON.parse(saved));
  setLoading(false);
}, []);

  async function login(username: string, password: string) {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    const newUser = {
      id: data.id,
      username: data.username,
      token: data.token,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be inside UserProvider");
  return context;
}
