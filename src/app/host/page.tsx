"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HostListingCard from "@/components/HostListingCard";
import { useAppStore } from "@/store";
import type { SpaceType, RateType } from "@/lib/types";

export default function HostPage() {
  const router = useRouter();
  const { currentUser, hostListings, addHostListing } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [spaceType, setSpaceType] = useState<SpaceType>("DRIVEWAY");
  const [address, setAddress] = useState("");
  const [rateType, setRateType] = useState<RateType>("HOURLY");
  const [hourlyRate, setHourlyRate] = useState("");
  const [flatRate, setFlatRate] = useState("");
  const [waterHookup, setWaterHookup] = useState(false);
  const [electricalOut, setElectricalOut] = useState(false);
  const [shadeCanopy, setShadeCanopy] = useState(false);
  const [pavedFlat, setPavedFlat] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/auth");
      return;
    }

    addHostListing({
      hostId: currentUser.id,
      hostName: currentUser.name,
      title,
      description: description || undefined,
      spaceType,
      address,
      hourlyRate: rateType === "HOURLY" ? parseFloat(hourlyRate) : undefined,
      flatRate: rateType === "FLAT" ? parseFloat(flatRate) : undefined,
      rateType,
      waterHookup,
      electricalOut,
      shadeCanopy,
      pavedFlat,
    });

    setSubmitted(true);
    setShowForm(false);
    setTitle("");
    setDescription("");
    setAddress("");
    setHourlyRate("");
    setFlatRate("");
  };

  const availableListings = hostListings.filter((l) => l.available);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Host a Detailing Space
              </h1>
              <p className="text-slate-400 mt-1">
                List your driveway, garage, or commercial bay for detailers to
                use.
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
            >
              {showForm ? "Cancel" : "+ List a Space"}
            </button>
          </div>

          {submitted && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 mb-6 text-emerald-400">
              Your space has been listed successfully! Detailers can now find it
              when looking for places to work.
            </div>
          )}

          {/* Create Form */}
          {showForm && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-6">
                List Your Space
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Space Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      placeholder="e.g., Shaded Driveway with Water"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">
                      Space Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { value: "DRIVEWAY", label: "Driveway", icon: "🏡" },
                          { value: "GARAGE", label: "Garage", icon: "🏠" },
                          {
                            value: "COMMERCIAL_BAY",
                            label: "Commercial",
                            icon: "🏭",
                          },
                        ] as const
                      ).map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setSpaceType(type.value)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            spaceType === type.value
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-slate-600 bg-slate-900/50 hover:border-slate-500"
                          }`}
                        >
                          <div className="text-xl">{type.icon}</div>
                          <div
                            className={`text-xs mt-1 ${spaceType === type.value ? "text-amber-400" : "text-slate-400"}`}
                          >
                            {type.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                    placeholder="Describe your space, what's included, any rules..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    placeholder="Full address"
                  />
                </div>

                {/* Rate */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Rate Structure *
                  </label>
                  <div className="flex gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setRateType("HOURLY")}
                      className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                        rateType === "HOURLY"
                          ? "border-amber-500 bg-amber-500/10 text-amber-400"
                          : "border-slate-600 bg-slate-900/50 text-slate-400"
                      }`}
                    >
                      <div className="font-medium">Hourly Rate</div>
                      <div className="text-xs mt-0.5 opacity-70">
                        Per-hour fee
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRateType("FLAT")}
                      className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                        rateType === "FLAT"
                          ? "border-amber-500 bg-amber-500/10 text-amber-400"
                          : "border-slate-600 bg-slate-900/50 text-slate-400"
                      }`}
                    >
                      <div className="font-medium">Flat Rate</div>
                      <div className="text-xs mt-0.5 opacity-70">
                        One-time fee per use
                      </div>
                    </button>
                  </div>
                  <div className="relative max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={rateType === "HOURLY" ? hourlyRate : flatRate}
                      onChange={(e) =>
                        rateType === "HOURLY"
                          ? setHourlyRate(e.target.value)
                          : setFlatRate(e.target.value)
                      }
                      required
                      min="1"
                      step="0.01"
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-8 pr-16 py-3 text-white text-lg font-bold focus:outline-none focus:border-amber-500"
                      placeholder="0.00"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      {rateType === "HOURLY" ? "/hour" : "flat"}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Utilities & Amenities Provided
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        key: "water",
                        label: "Water Hookup",
                        icon: "💧",
                        active: waterHookup,
                        toggle: () => setWaterHookup(!waterHookup),
                      },
                      {
                        key: "electric",
                        label: "Electrical Outlet",
                        icon: "⚡",
                        active: electricalOut,
                        toggle: () => setElectricalOut(!electricalOut),
                      },
                      {
                        key: "shade",
                        label: "Shade / Canopy",
                        icon: "🏕️",
                        active: shadeCanopy,
                        toggle: () => setShadeCanopy(!shadeCanopy),
                      },
                      {
                        key: "paved",
                        label: "Paved / Flat Ground",
                        icon: "🅿️",
                        active: pavedFlat,
                        toggle: () => setPavedFlat(!pavedFlat),
                      },
                    ].map((amenity) => (
                      <button
                        key={amenity.key}
                        type="button"
                        onClick={amenity.toggle}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                          amenity.active
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-slate-600 bg-slate-900/50 hover:border-slate-500"
                        }`}
                      >
                        <span className="text-2xl">{amenity.icon}</span>
                        <div className="text-left">
                          <div
                            className={`text-sm font-medium ${amenity.active ? "text-emerald-400" : "text-white"}`}
                          >
                            {amenity.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {amenity.active ? "Provided" : "Not provided"}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25"
                >
                  List My Space
                </button>

                {!currentUser && (
                  <p className="text-center text-slate-500 text-sm">
                    You&apos;ll need to sign in before listing.
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Existing Listings */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Available Spaces ({availableListings.length})
            </h2>
            {availableListings.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/30 rounded-xl">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl text-white font-semibold mb-2">
                  No spaces listed yet
                </h3>
                <p className="text-slate-400">
                  Be the first to list a detailing space in your area!
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableListings.map((listing) => (
                  <HostListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
