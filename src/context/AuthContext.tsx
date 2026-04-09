import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

interface User {
  id: string;
  username: string;
  email?: string | null;
  role: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (
    username: string,
    password: string,
    displayName: string,
    email?: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth from localStorage on mount & verify token is still valid
  useEffect(() => {
    const restoreAuth = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          // Verify token is still valid by fetching profile
          const profile = await apiClient.getProfile(savedToken);
          setToken(savedToken);
          setUser(profile);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await apiClient.login(username, password);
      setToken(result.token);
      setUser(result.user);
      apiClient.setToken(result.token, result.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    username: string,
    password: string,
    displayName: string,
    email?: string,
  ) => {
    setIsLoading(true);
    try {
      const result = await apiClient.signup(
        username,
        password,
        displayName,
        email,
      );
      setToken(result.token);
      setUser(result.user);
      apiClient.setToken(result.token, result.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    apiClient.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
