import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full px-10 py-4 flex justify-between items-center bg-white border-b border-blue-600/10 relative">
      <div>
        <h1 className="font-bold text-blue-500 text-xl">
          BrainLY
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
