"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAppStore } from "@/store";
import type { UserRole } from "@/lib/types";

export default function AuthPage() {
  const router = useRouter();
  const { register, login } = useAppStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("CLEAN_NEEDER");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const user = login(email, password);
      if (!user) {
        setError("Invalid email or password. Try: john@example.com, maria@example.com, or tom@example.com");
        return;
      }
      router.push(
        user.role === "DETAILER"
          ? "/dashboard"
          : user.role === "HOST"
            ? "/host"
            : "/"
      );
    } else {
      try {
        const user = register(email, name, password, role);
        router.push(
          user.role === "DETAILER"
            ? "/dashboard"
            : user.role === "HOST"
              ? "/host"
              : "/"
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      }
    }
  };

  const roles: { value: UserRole; label: string; desc: string }[] = [
    {
      value: "CLEAN_NEEDER",
      label: "Clean Needer",
      desc: "I need my vehicle detailed",
    },
    {
      value: "DETAILER",
      label: "Detailer",
      desc: "I provide detailing services",
    },
    {
      value: "HOST",
      label: "Host",
      desc: "I have a space for detailing",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-slate-400 mt-2 text-sm">
                {isLogin
                  ? "Sign in to your Shine Theory account"
                  : "Join the Shine Theory marketplace"}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-500/30 rounded-lg p-3 mb-6 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      I am a...
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            role === r.value
                              ? "border-amber-500 bg-amber-500/10 text-amber-400"
                              : "border-slate-600 bg-slate-900/50 text-slate-400 hover:border-slate-500"
                          }`}
                        >
                          <div className="text-sm font-medium">{r.label}</div>
                          <div className="text-xs mt-0.5 opacity-70">
                            {r.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-3 rounded-xl font-bold transition-colors"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {isLogin && (
              <div className="mt-4 p-3 bg-slate-900/50 rounded-lg text-xs text-slate-500">
                <div className="font-medium text-slate-400 mb-1">
                  Demo accounts:
                </div>
                <div>john@example.com (Clean Needer)</div>
                <div>maria@example.com (Detailer)</div>
                <div>tom@example.com (Host)</div>
                <div className="mt-1 text-slate-600">
                  Any password works for demo
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
