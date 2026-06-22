"use client";

interface AmenityBadgeProps {
  label: string;
  active: boolean;
  icon: string;
  onClick?: () => void;
  toggleable?: boolean;
}

export default function AmenityBadge({
  label,
  active,
  icon,
  onClick,
  toggleable = false,
}: AmenityBadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all";
  const activeClass = "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
  const inactiveClass = "bg-slate-700/50 text-slate-500 border border-slate-600/30";
  const clickableClass = toggleable ? "cursor-pointer hover:scale-105" : "";

  return (
    <span
      className={`${base} ${active ? activeClass : inactiveClass} ${clickableClass}`}
      onClick={onClick}
      role={toggleable ? "button" : undefined}
      tabIndex={toggleable ? 0 : undefined}
      onKeyDown={
        toggleable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick?.();
            }
          : undefined
      }
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
