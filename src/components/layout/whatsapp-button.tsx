import { siteConfig } from "@/lib/seo";

export function WhatsAppButton() {
  const number = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi Velocita — I'd like a freight quote.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-700/30 ring-4 ring-white/40 transition-transform hover:scale-105 dark:ring-white/10"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.05 4.91A10 10 0 0 0 4.18 17.13L3 21l3.95-1.16A10 10 0 1 0 19.05 4.91Zm-7 15.34a8.27 8.27 0 0 1-4.21-1.16l-.3-.18-2.34.69.7-2.28-.2-.31a8.29 8.29 0 1 1 6.35 3.24Zm4.55-6.2c-.25-.13-1.46-.72-1.69-.8-.23-.08-.4-.13-.56.13s-.64.8-.78.97c-.14.16-.29.18-.54.06a6.78 6.78 0 0 1-2-1.24 7.5 7.5 0 0 1-1.39-1.74c-.14-.25 0-.39.11-.51.11-.11.25-.29.37-.43a1.7 1.7 0 0 0 .25-.42.46.46 0 0 0 0-.43c-.07-.13-.56-1.36-.77-1.86-.2-.49-.4-.42-.56-.43h-.48a.91.91 0 0 0-.66.31 2.79 2.79 0 0 0-.87 2.07c0 1.22.89 2.4 1 2.57s1.74 2.66 4.22 3.74c.59.25 1.05.4 1.41.51a3.42 3.42 0 0 0 1.56.1 2.55 2.55 0 0 0 1.67-1.18 2.07 2.07 0 0 0 .14-1.18c-.06-.1-.23-.16-.48-.29Z" />
      </svg>
    </a>
  );
}
