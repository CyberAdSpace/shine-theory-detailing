"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppStore } from "@/store";
import type { LocationType } from "@/lib/types";

export default function PostJobPage() {
  const router = useRouter();
  const { currentUser, addPosting } = useAppStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [targetPrice, setTargetPrice] = useState("");
  const [locationType, setLocationType] = useState<LocationType>("ON_SITE");
  const [address, setAddress] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [waterHookup, setWaterHookup] = useState(false);
  const [electricalOut, setElectricalOut] = useState(false);
  const [shadeCanopy, setShadeCanopy] = useState(false);
  const [pavedFlat, setPavedFlat] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: string[] = [];
    for (let i = 0; i < Math.min(files.length, 4 - photos.length); i++) {
      newPhotos.push(URL.createObjectURL(files[i]));
    }
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 4));
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/auth");
      return;
    }
    addPosting({
      userId: currentUser.id,
      userName: currentUser.name,
      title,
      description: description || undefined,
      photos: photos.length > 0 ? photos : ["/demo/car1.jpg"],
      targetPrice: parseFloat(targetPrice),
      locationType,
      address: address || undefined,
      vehicleType: vehicleType || undefined,
      vehicleYear: vehicleYear || undefined,
      waterHookup,
      electricalOut,
      shadeCanopy,
      pavedFlat,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Job Posted Successfully!
            </h1>
            <p className="text-slate-400 mb-8">
              Your detailing request is now live. Detailers in your area will be
              able to see it and submit bids.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                View Dashboard
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTitle("");
                  setDescription("");
                  setPhotos([]);
                  setTargetPrice("");
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Post Another
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Post a Detailing Job
            </h1>
            <p className="text-slate-400 mt-2">
              Upload photos of your vehicle, set your price, and let detailers
              come to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photos */}
            <section className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Vehicle Photos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-700 rounded-lg relative overflow-hidden group"
                  >
                    <Image
                      src={photo}
                      alt={`Vehicle photo ${i + 1}`}
                      className="w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 4 && (
                  <label className="aspect-square bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors">
                    <svg
                      className="w-8 h-8 text-slate-500 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-xs text-slate-500">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      multiple
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Upload 3–4 photos of your vehicle ({photos.length}/4)
              </p>
            </section>

            {/* Vehicle Info */}
            <section className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">
                Vehicle Details
              </h2>
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  placeholder="e.g., 2021 Honda Civic — Full Detail Needed"
                />
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
                  placeholder="Describe what needs to be done..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select type</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Van</option>
                    <option>Coupe</option>
                    <option>Convertible</option>
                    <option>Motorcycle</option>
                    <option>Boat</option>
                    <option>RV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Vehicle Year
                  </label>
                  <input
                    type="text"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>
            </section>

            {/* Price */}
            <section className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Your Offer
              </h2>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-8 pr-4 py-3 text-white text-2xl font-bold focus:outline-none focus:border-amber-500"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Set your target price. Detailers can accept or counter-offer.
              </p>
            </section>

            {/* Location */}
            <section className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white">Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    {
                      value: "ON_SITE",
                      label: "On-Site",
                      desc: "Detailer comes to me",
                      icon: "📍",
                    },
                    {
                      value: "MEET_UP",
                      label: "Meet Up",
                      desc: "I go to the detailer",
                      icon: "🤝",
                    },
                    {
                      value: "NEED_A_PLACE",
                      label: "Need a Place",
                      desc: "Match me with a host",
                      icon: "🏠",
                    },
                  ] as const
                ).map((loc) => (
                  <button
                    key={loc.value}
                    type="button"
                    onClick={() => setLocationType(loc.value)}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      locationType === loc.value
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-slate-600 bg-slate-900/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="text-2xl mb-1">{loc.icon}</div>
                    <div
                      className={`text-sm font-medium ${locationType === loc.value ? "text-amber-400" : "text-white"}`}
                    >
                      {loc.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {loc.desc}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Address / Area
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  placeholder="Enter your address or general area"
                />
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                Available Amenities
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                Toggle what&apos;s available at your location.
              </p>
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
                        {amenity.active ? "Available" : "Not available"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-xl text-lg font-bold transition-all hover:shadow-lg hover:shadow-amber-500/25"
            >
              Post Detailing Job
            </button>

            {!currentUser && (
              <p className="text-center text-slate-500 text-sm">
                You&apos;ll need to sign in before posting.
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
