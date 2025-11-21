import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In production, call your API: POST /api/auth/login
      // For now, mock login for demo
      const mockUsers: Record<string, User> = {
        "admin@fabrichub.com": {
          id: "admin-1",
          email: "admin@fabrichub.com",
          firstName: "Admin",
          lastName: "User",
          role: "ADMIN",
        },
        "customer@fabrichub.com": {
          id: "customer-1",
          email: "customer@fabrichub.com",
          firstName: "John",
          lastName: "Doe",
          role: "CUSTOMER",
        },
        "seller@fabrichub.com": {
          id: "seller-1",
          email: "seller@fabrichub.com",
          firstName: "Fabric",
          lastName: "Seller",
          role: "SELLER",
        },
      };

      const foundUser = mockUsers[email];

      if (!foundUser || password !== "password") {
        throw new Error("Invalid email or password");
      }

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
