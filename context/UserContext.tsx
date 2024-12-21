import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticateUser, validateToken } from "../services/auth";

interface UserContextProps {
  walletAddress: string | null;
  isAuthenticated: boolean;
  authenticate: (walletAddress: string, signature: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      validateToken(token)
        .then((data) => {
          setWalletAddress(data.walletAddress);
          setIsAuthenticated(true);
        })
        .catch(() => {
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        });
    }
  }, []);

  const authenticate = async (walletAddress: string, signature: string) => {
    const { token } = await authenticateUser(walletAddress, signature);
    document.cookie = `token=${token}; path=/`;
    setWalletAddress(walletAddress);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setWalletAddress(null);
    setIsAuthenticated(false);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <UserContext.Provider value={{ walletAddress, isAuthenticated, authenticate, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};
