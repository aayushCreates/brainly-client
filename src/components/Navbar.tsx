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
    <nav className="w-full px-10 py-5 flex justify-between items-center bg-white shadow-xs border-b border-black/10 relative">
      <div>
        {/* <img
          src="/logo.png"
          alt="LOGO"
          className="h-8 w-auto hover:cursor-pointer"
        /> */}
        <p className="bg-blue-400/10 border border-blue-500/20 text-blue-500 px-5 py-2 rounded-md shadow-xs">
          BrainLY
        </p>
      </div>

      <div>
        <ul className="flex">
          <li className="hover:text-blue-500 hover:bg-blue-500/10 px-3 py-1 rounded-sm cursor-pointer transition-colors">
            Home
          </li>
          <li className="hover:text-blue-500 hover:bg-blue-500/10 px-3 py-1 rounded-sm cursor-pointer transition-colors">
            Tasks
          </li>
        </ul>
      </div>

      <div className="relative flex gap-2 items-center" ref={dropdownRef}>
        <img
          src={user?.avatarUrl}
          alt="avatar"
          className="rounded-full w-8 h-8 cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-48 w-40 bg-white border border-black/10 rounded-md shadow-sm z-50 overflow-hidden animate-fadeIn">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
                Tasks
              </li>
              <li
                className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer transition-colors"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
