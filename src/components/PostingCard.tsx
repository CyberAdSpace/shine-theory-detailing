"use client";

import type { Posting } from "@/lib/types";
import { formatPrice, formatDate, getLocationLabel } from "@/lib/utils";
import AmenityBadge from "./AmenityBadge";

interface PostingCardProps {
  posting: Posting;
  onViewDetails: (posting: Posting) => void;
}

export default function PostingCard({ posting, onViewDetails }: PostingCardProps) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group">
      <div className="aspect-video bg-slate-700/50 relative overflow-hidden">
        {posting.photos.length > 0 ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl block mb-2">🚗</span>
              <span className="text-slate-500 text-xs">
                {posting.photos.length} photos uploaded
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-500">No photos</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
            {formatPrice(posting.targetPrice)}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 px-2 py-1 rounded-md text-xs">
            {getLocationLabel(posting.locationType)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-amber-400 transition-colors">
            {posting.title}
          </h3>
          {posting.description && (
            <p className="text-slate-400 text-sm mt-1 line-clamp-2">
              {posting.description}
            </p>
          )}
        </div>

        {posting.address && (
          <p className="text-slate-500 text-xs flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {posting.address}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          <AmenityBadge label="Water" active={posting.waterHookup} icon="💧" />
          <AmenityBadge
            label="Electric"
            active={posting.electricalOut}
            icon="⚡"
          />
          <AmenityBadge label="Shade" active={posting.shadeCanopy} icon="🏕️" />
          <AmenityBadge label="Paved" active={posting.pavedFlat} icon="🅿️" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <div className="text-xs text-slate-500">
            <span>By {posting.userName}</span>
            <span className="mx-1">·</span>
            <span>{formatDate(posting.createdAt)}</span>
            {posting.bids.length > 0 && (
              <>
                <span className="mx-1">·</span>
                <span className="text-amber-500">
                  {posting.bids.length} bid{posting.bids.length !== 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => onViewDetails(posting)}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
