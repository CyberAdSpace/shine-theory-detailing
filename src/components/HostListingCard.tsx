"use client";

import type { HostListing } from "@/lib/types";
import { formatPrice, getSpaceTypeLabel } from "@/lib/utils";
import AmenityBadge from "./AmenityBadge";

interface HostListingCardProps {
  listing: HostListing;
}

export default function HostListingCard({ listing }: HostListingCardProps) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
        <div className="text-center">
          <span className="text-4xl block mb-2">
            {listing.spaceType === "GARAGE"
              ? "🏠"
              : listing.spaceType === "COMMERCIAL_BAY"
                ? "🏭"
                : "🏡"}
          </span>
          <span className="text-slate-500 text-xs">
            {getSpaceTypeLabel(listing.spaceType)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
            {listing.rateType === "HOURLY"
              ? `${formatPrice(listing.hourlyRate ?? 0)}/hr`
              : formatPrice(listing.flatRate ?? 0)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-white font-semibold text-lg">{listing.title}</h3>
        {listing.description && (
          <p className="text-slate-400 text-sm line-clamp-2">
            {listing.description}
          </p>
        )}

        <p className="text-slate-500 text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {listing.address}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <AmenityBadge label="Water" active={listing.waterHookup} icon="💧" />
          <AmenityBadge
            label="Electric"
            active={listing.electricalOut}
            icon="⚡"
          />
          <AmenityBadge label="Shade" active={listing.shadeCanopy} icon="🏕️" />
          <AmenityBadge label="Paved" active={listing.pavedFlat} icon="🅿️" />
        </div>

        <div className="text-xs text-slate-500 pt-2 border-t border-slate-700/50">
          Hosted by {listing.hostName}
        </div>
      </div>
    </div>
  );
}
