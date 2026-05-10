import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Velocita Logistics — home"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-700/30 transition-transform group-hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
        >
          <path
            d="M3 13l3-9 4 6 4-3 4 8 3-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="5" r="2" fill="currentColor" />
        </svg>
      </span>
      {showWord && (
        <span className="text-foreground">
          Velocita
          <span className="ml-0.5 text-brand-500">.</span>
        </span>
      )}
    </Link>
  );
}
