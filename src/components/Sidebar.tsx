'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BiChat, BiUser } from 'react-icons/bi'
import { FaTasks } from 'react-icons/fa'
import {
  FiHome,
  FiBookOpen,
  FiStar,
  FiTag,
  FiArchive,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/home', icon: <FiHome /> },
  { label: 'Tasks', href: '/tasks', icon: <FaTasks /> },
  { label: 'Favorites', href: '/favorites', icon: <FiStar /> },
  { label: 'Chat with Brain', href: '/chat', icon: <BiChat /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`relative h-screen border-r border-r-gray-100 bg-white transition-all duration-300
      ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-b-gray-100 px-4">
        {!collapsed && (
          <span className="text-lg font-bold text-blue-500">
            BrainLY
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${
                  active
                    ? 'bg-blue-50 text-blue-500'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <span className="text-lg rounded-sm text-blue-500 px-1.5 py-1.5">{item.icon}</span>

              {!collapsed && (
                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-t-gray-100 p-2">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <BiUser className="text-lg" />
          {!collapsed && <span>Profile</span>}
        </Link>
      </div>
    </div>
  )
}
