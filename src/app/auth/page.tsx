"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Sparkles } from "lucide-react";
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
        setError(
          "Invalid email or password. Try the demo accounts below."
        );
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
      label: "Owner",
      desc: "I need detailing",
    },
    {
      value: "DETAILER",
      label: "Detailer",
      desc: "I provide service",
    },
    {
      value: "HOST",
      label: "Host",
      desc: "I have space",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT — visual side */}
      <div className="relative lg:w-3/5 h-48 lg:h-auto lg:min-h-screen overflow-hidden">
        <Image
          src="/img/hero.png"
          alt="Glossy black luxury car detail"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 60%, rgba(240, 180, 41, 0.18) 0%, transparent 55%)",
          }}
        />

        {/* Logo top-left */}
        <Link
          href="/"
          className="absolute top-6 left-6 lg:top-10 lg:left-10 inline-flex items-center gap-2 group z-10"
        >
          <span className="text-[var(--gold)] group-hover:scale-110 transition-transform">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Shine Theory logo"
            >
              <defs>
                <linearGradient id="auth-grad" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#ffcd57" />
                  <stop offset="100%" stopColor="#c8941a" />
                </linearGradient>
              </defs>
              <path
                d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"
                fill="url(#auth-grad)"
              />
            </svg>
          </span>
          <span className="serif text-lg text-white tracking-tight">
            Shine Theory
          </span>
        </Link>

        {/* Quote */}
        <div className="hidden lg:flex absolute inset-0 items-end p-14 z-10">
          <div className="max-w-md">
            <div className="eyebrow mb-4">Detail Marketplace</div>
            <p className="serif text-3xl xl:text-4xl text-white leading-tight">
              Where mirror finishes meet master hands.
            </p>
            <p className="text-[var(--text-muted)] mt-4 text-sm max-w-sm">
              Join detailers, owners and space-hosts building the next era of
              car care.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — form side */}
      <div className="lg:w-2/5 flex items-center justify-center p-6 sm:p-10 lg:p-14 min-h-[calc(100vh-12rem)] lg:min-h-screen">
        <div className="w-full max-w-md">
          <div className="glass-strong rounded-2xl p-8 sm:p-10">
            <div className="mb-8">
              <div className="eyebrow mb-2">
                {isLogin ? "Welcome back" : "Get started"}
              </div>
              <h1 className="serif text-3xl text-white tracking-tight">
                {isLogin ? "Sign in" : "Create your account"}
              </h1>
              <p className="text-[var(--text-muted)] mt-2 text-sm">
                {isLogin
                  ? "Continue to your Shine Theory account."
                  : "Join the Shine Theory marketplace."}
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 mb-6">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-red-300 text-xs leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input-premium"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
                      I am a
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map((r) => {
                        const active = role === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => setRole(r.value)}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              active
                                ? "border-[var(--gold)]/60 bg-[var(--gold)]/10"
                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                            }`}
                          >
                            <div
                              className={`text-sm font-medium ${active ? "text-[var(--gold-light)]" : "text-white"}`}
                            >
                              {r.label}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider mt-1 text-[var(--text-faint)]">
                              {r.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-premium"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-premium"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="btn-gold w-full justify-center">
                {isLogin ? (
                  "Sign In"
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Create Account
                  </>
                )}
              </button>
            </form>

            {isLogin && (
              <details className="mt-5 group">
                <summary className="cursor-pointer text-xs uppercase tracking-wider text-[var(--text-faint)] hover:text-[var(--gold)] transition-colors flex items-center gap-1 list-none">
                  <span className="group-open:rotate-90 transition-transform inline-block">
                    ▸
                  </span>
                  Demo accounts
                </summary>
                <div className="mt-3 glass rounded-xl p-4 text-xs space-y-1.5">
                  <div className="flex justify-between text-[var(--text-body)]">
                    <span className="font-mono">john@example.com</span>
                    <span className="text-[var(--text-faint)]">Owner</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-body)]">
                    <span className="font-mono">maria@example.com</span>
                    <span className="text-[var(--text-faint)]">Detailer</span>
                  </div>
                  <div className="flex justify-between text-[var(--text-body)]">
                    <span className="font-mono">tom@example.com</span>
                    <span className="text-[var(--text-faint)]">Host</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-faint)] mt-2 pt-2 border-t border-white/5">
                    Any password works in demo mode
                  </div>
                </div>
              </details>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-[var(--text-muted)]">
                {isLogin ? "New to Shine Theory? " : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-[var(--gold)] hover:text-[var(--gold-light)] font-medium transition-colors"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-[var(--text-faint)] mt-6">
            By continuing you agree to the Shine Theory terms of service.
          </p>
        </div>
      </div>
    </main>
  );
}
