"use client";

import { useState } from "react";
import type { Posting } from "@/lib/types";
import { useAppStore } from "@/store";
import { formatPrice, formatDate, getLocationLabel } from "@/lib/utils";
import AmenityBadge from "./AmenityBadge";

interface PostingDetailModalProps {
  posting: Posting;
  onClose: () => void;
}

export default function PostingDetailModal({
  posting,
  onClose,
}: PostingDetailModalProps) {
  const { currentUser, addBid, acceptBid, rejectBid } = useAppStore();
  const [bidAmount, setBidAmount] = useState(posting.targetPrice.toString());
  const [bidMessage, setBidMessage] = useState("");
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  const isOwner = currentUser?.id === posting.userId;
  const isDetailer = currentUser?.role === "DETAILER";
  const alreadyBid = posting.bids.some(
    (b) => b.detailerId === currentUser?.id
  );

  const handleSubmitBid = () => {
    if (!currentUser) return;
    addBid({
      postingId: posting.id,
      detailerId: currentUser.id,
      detailerName: currentUser.name,
      amount: parseFloat(bidAmount),
      message: bidMessage || undefined,
    });
    setBidSubmitted(true);
    setShowBidForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {posting.title}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Posted by {posting.userName} · {formatDate(posting.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {posting.photos.map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-slate-700/50 rounded-lg flex items-center justify-center"
              >
                <span className="text-3xl">🚗</span>
              </div>
            ))}
          </div>

          {posting.description && (
            <p className="text-slate-300">{posting.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Target Price
              </div>
              <div className="text-2xl font-bold text-amber-400">
                {formatPrice(posting.targetPrice)}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Location Type
              </div>
              <div className="text-white font-medium">
                {getLocationLabel(posting.locationType)}
              </div>
            </div>
          </div>

          {posting.address && (
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Address
              </div>
              <div className="text-white">{posting.address}</div>
            </div>
          )}

          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
              Available Amenities
            </div>
            <div className="flex flex-wrap gap-2">
              <AmenityBadge
                label="Water Hookup"
                active={posting.waterHookup}
                icon="💧"
              />
              <AmenityBadge
                label="Electrical Outlet"
                active={posting.electricalOut}
                icon="⚡"
              />
              <AmenityBadge
                label="Shade / Canopy"
                active={posting.shadeCanopy}
                icon="🏕️"
              />
              <AmenityBadge
                label="Paved / Flat"
                active={posting.pavedFlat}
                icon="🅿️"
              />
            </div>
          </div>

          {posting.vehicleType && (
            <div className="flex gap-4 text-sm text-slate-400">
              <span>Vehicle: {posting.vehicleType}</span>
              {posting.vehicleYear && <span>Year: {posting.vehicleYear}</span>}
            </div>
          )}

          {/* Bids Section */}
          {posting.bids.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">
                Bids ({posting.bids.length})
              </h3>
              <div className="space-y-2">
                {posting.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-medium">
                        {bid.detailerName}
                      </div>
                      <div className="text-amber-400 font-bold">
                        {formatPrice(bid.amount)}
                      </div>
                      {bid.message && (
                        <p className="text-slate-400 text-sm mt-1">
                          {bid.message}
                        </p>
                      )}
                      <span
                        className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                          bid.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : bid.status === "ACCEPTED"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>
                    {isOwner && bid.status === "PENDING" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptBid(posting.id, bid.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectBid(posting.id, bid.id)}
                          className="bg-red-600/50 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bid Form for Detailers */}
          {isDetailer && !alreadyBid && !bidSubmitted && posting.status === "OPEN" && (
            <div>
              {!showBidForm ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!currentUser) return;
                      addBid({
                        postingId: posting.id,
                        detailerId: currentUser.id,
                        detailerName: currentUser.name,
                        amount: posting.targetPrice,
                      });
                      setBidSubmitted(true);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors"
                  >
                    Accept at {formatPrice(posting.targetPrice)}
                  </button>
                  <button
                    onClick={() => setShowBidForm(true)}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Counter Offer
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                  <h4 className="text-white font-medium">Submit Counter Offer</h4>
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">
                      Your Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg pl-7 pr-4 py-2 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 block mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 resize-none"
                      placeholder="Why you're the right detailer for this job..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitBid}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 py-2 rounded-lg font-semibold"
                    >
                      Submit Offer
                    </button>
                    <button
                      onClick={() => setShowBidForm(false)}
                      className="px-4 py-2 text-slate-400 hover:text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {bidSubmitted && (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 text-center text-emerald-400">
              Your bid has been submitted! The customer will review it shortly.
            </div>
          )}

          {!currentUser && (
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 mb-2">
                Sign in as a Detailer to bid on this job
              </p>
              <a
                href="/auth"
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Sign In →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
