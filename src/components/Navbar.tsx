"use client";

import Link from "next/link";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { currentUser, logout } = useAppStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Shine Theory
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/post"
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Post a Job
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Detailer Board
            </Link>
            <Link
              href="/host"
              className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Host a Space
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  {currentUser.name}
                  <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                    {currentUser.role.replace("_", " ")}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700 mt-2 pt-4 space-y-3">
            <Link
              href="/post"
              className="block text-slate-300 hover:text-amber-400"
              onClick={() => setMenuOpen(false)}
            >
              Post a Job
            </Link>
            <Link
              href="/dashboard"
              className="block text-slate-300 hover:text-amber-400"
              onClick={() => setMenuOpen(false)}
            >
              Detailer Board
            </Link>
            <Link
              href="/host"
              className="block text-slate-300 hover:text-amber-400"
              onClick={() => setMenuOpen(false)}
            >
              Host a Space
            </Link>
            {currentUser ? (
              <>
                <div className="text-sm text-slate-400">
                  Signed in as {currentUser.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block bg-amber-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
