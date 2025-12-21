import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  email: string;
}

interface User {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, phone: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  oAuth: ()=> void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
  
    if (tokenFromUrl) {
      try {
        const decoded: DecodedToken = jwtDecode(tokenFromUrl);
        setToken(tokenFromUrl);
        setUser({ id: decoded.id, email: decoded.email });
  
        localStorage.setItem("token", tokenFromUrl);
  
        router.replace("/home");
        return;
      } catch {
        toast.error("Invalid token");
      }
    }
  
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        if (decoded.exp > Date.now() / 1000) {
          setToken(storedToken);
          setUser({ id: decoded.id, email: decoded.email });
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);
  

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, {
        email,
        password,
      });

      const tokenString = typeof data.token === "string" ? data.token : JSON.stringify(data.token);

      if (data?.token) {
        setToken(data.token);
        setUser({ id: data.data.id, name: data.data.name, email: data.data.email, phone: data.data.phone, avatarUrl: data.data.avatarUrl });
        localStorage.setItem("token", tokenString);
        localStorage.setItem("user", JSON.stringify({ id: data.data.id as string, email: data.data.email as string, phone: data.data.phone as string, avatarUrl: data.data.avatarUrl as string }));
        router.replace("/home");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, {
        name: name,
        email: email,
        phone: phone,
        password: password,
      });

      const tokenString = typeof data.token === "string" ? data.token : JSON.stringify(data.token);

      if (data?.token) {
        setToken(data.token);
        setUser({ id: data.data.id, name: data.data.name, email: data.data.email, phone: data.data.phone, avatarUrl: data.data.avatarUrl });
        localStorage.setItem("token", tokenString);
        localStorage.setItem("user", JSON.stringify({ id: data.data.id as string, email: data.data.email as string, phone: data.data.phone as string, avatarUrl: data.data.avatarUrl as string }));
        toast.success("Registration successful");
        router.push("/home");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const oAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/");
    toast.success("Logged out successfully");
  };

  const isAuthenticated = !!token;

  return <AuthContext.Provider value={{ user, isAuthenticated, login, register, oAuth, logout }}>
    { children }
  </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };