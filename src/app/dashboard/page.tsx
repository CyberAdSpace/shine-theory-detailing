"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import PostingCard from "@/components/PostingCard";
import PostingDetailModal from "@/components/PostingDetailModal";
import { useAppStore } from "@/store";
import type { Posting } from "@/lib/types";
import type { PostingFilters } from "@/store";

export default function DashboardPage() {
  const { postings } = useAppStore();
  const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filters, setFilters] = useState<PostingFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredPostings = useMemo(() => {
    let result = postings.filter((p) => p.status === "OPEN");
    if (filters.minPrice !== undefined)
      result = result.filter((p) => p.targetPrice >= filters.minPrice!);
    if (filters.maxPrice !== undefined)
      result = result.filter((p) => p.targetPrice <= filters.maxPrice!);
    if (filters.waterHookup) result = result.filter((p) => p.waterHookup);
    if (filters.electricalOut) result = result.filter((p) => p.electricalOut);
    if (filters.shadeCanopy) result = result.filter((p) => p.shadeCanopy);
    if (filters.pavedFlat) result = result.filter((p) => p.pavedFlat);
    return result;
  }, [postings, filters]);

  const handleViewDetails = (posting: Posting) => {
    const fresh = postings.find((p) => p.id === posting.id);
    setSelectedPosting(fresh ?? posting);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Detailing Jobs Board
              </h1>
              <p className="text-slate-400 mt-1">
                {filteredPostings.length} open job
                {filteredPostings.length !== 1 ? "s" : ""} in your area
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  showFilters
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
              >
                <span className="mr-1.5">⚙️</span> Filters
              </button>
              <div className="flex bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 text-sm ${
                    viewMode === "list"
                      ? "bg-amber-500 text-slate-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-2 text-sm ${
                    viewMode === "map"
                      ? "bg-amber-500 text-slate-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice ?? ""}
                      onChange={(e) =>
                        setFilters((f) => ({
                          ...f,
                          minPrice: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }))
                      }
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice ?? ""}
                      onChange={(e) =>
                        setFilters((f) => ({
                          ...f,
                          maxPrice: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }))
                      }
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
                    Required Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        key: "waterHookup" as const,
                        label: "Water Hookup",
                        icon: "💧",
                      },
                      {
                        key: "electricalOut" as const,
                        label: "Electrical",
                        icon: "⚡",
                      },
                      {
                        key: "shadeCanopy" as const,
                        label: "Shade",
                        icon: "🏕️",
                      },
                      {
                        key: "pavedFlat" as const,
                        label: "Paved",
                        icon: "🅿️",
                      },
                    ].map((amenity) => (
                      <button
                        key={amenity.key}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            [amenity.key]: f[amenity.key] ? undefined : true,
                          }))
                        }
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition-all ${
                          filters[amenity.key]
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                            : "border-slate-600 bg-slate-900/50 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        <span>{amenity.icon}</span>
                        {amenity.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({})}
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === "list" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPostings.length === 0 ? (
                <div className="sm:col-span-2 lg:col-span-3 text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl text-white font-semibold mb-2">
                    No jobs found
                  </h3>
                  <p className="text-slate-400">
                    {Object.keys(filters).some(
                      (k) =>
                        filters[k as keyof PostingFilters] !== undefined
                    )
                      ? "Try adjusting your filters"
                      : "Check back soon for new detailing requests"}
                  </p>
                </div>
              ) : (
                filteredPostings.map((posting) => (
                  <PostingCard
                    key={posting.id}
                    posting={posting}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl text-white font-semibold mb-2">
                    Map View
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    Interactive map showing {filteredPostings.length} open
                    detailing jobs in your area. Connect a maps API key to enable
                    live map functionality.
                  </p>
                </div>
                {/* Pin indicators */}
                {filteredPostings.map((posting, i) => (
                  <button
                    key={posting.id}
                    onClick={() => handleViewDetails(posting)}
                    className="absolute bg-amber-500 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform"
                    style={{
                      top: `${20 + (i * 15) % 60}%`,
                      left: `${15 + (i * 23) % 70}%`,
                    }}
                    title={posting.title}
                  >
                    ${Math.round(posting.targetPrice)}
                  </button>
                ))}
              </div>
              {/* Job list below map */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="space-y-2">
                  {filteredPostings.map((posting) => (
                    <button
                      key={posting.id}
                      onClick={() => handleViewDetails(posting)}
                      className="w-full flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors text-left"
                    >
                      <div>
                        <div className="text-white text-sm font-medium">
                          {posting.title}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {posting.address ?? "Location not specified"}
                        </div>
                      </div>
                      <span className="text-amber-400 font-bold">
                        ${posting.targetPrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedPosting && (
        <PostingDetailModal
          posting={
            postings.find((p) => p.id === selectedPosting.id) ??
            selectedPosting
          }
          onClose={() => setSelectedPosting(null)}
        />
      )}
    </>
  );
}
