"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAppStore } from "@/store";

export default function Home() {
  const { postings, hostListings } = useAppStore();

  const openJobs = postings.filter((p) => p.status === "OPEN").length;
  const availableSpaces = hostListings.filter((h) => h.available).length;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                <span className="block bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Shine Theory Detailing
                </span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-slate-300 font-medium italic">
                Mobile Detailing, Done Right.
              </p>
              <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                The marketplace connecting vehicle owners with top mobile
                detailers — and the spaces to make it happen.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/post"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25"
                >
                  I Need a Detail
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition-all"
                >
                  I&apos;m a Detailer
                </Link>
                <Link
                  href="/host"
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition-all"
                >
                  Host a Space
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-400">
                  {openJobs}
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  Open Detail Jobs
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400">
                  {availableSpaces}
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  Available Spaces
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-400">
                  3
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  Active Detailers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📸",
                title: "Post Your Vehicle",
                description:
                  "Upload photos, set your price, choose a location type, and toggle what amenities you have available.",
                role: "Clean Needers",
                color: "amber",
              },
              {
                icon: "🔍",
                title: "Find & Bid on Jobs",
                description:
                  "Browse local detailing requests, filter by distance, price, and amenities. Accept the price or counter-offer.",
                role: "Detailers",
                color: "emerald",
              },
              {
                icon: "🏠",
                title: "List Your Space",
                description:
                  "Have a driveway, garage, or commercial bay? List it with your hourly rate and available utilities.",
                role: "Hosts",
                color: "blue",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-slate-600 transition-all"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step.color === "amber"
                      ? "text-amber-400"
                      : step.color === "emerald"
                        ? "text-emerald-400"
                        : "text-blue-400"
                  }`}
                >
                  {step.role}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Whether you need a detail, want to offer your skills, or have a
              space to share — Shine Theory connects you with the right people.
            </p>
            <Link
              href="/auth"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shine Theory Detailing. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
