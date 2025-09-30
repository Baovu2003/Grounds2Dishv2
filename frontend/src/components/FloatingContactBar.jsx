import React from "react";

// Default social items with brand colors
const DEFAULT_ITEMS = [
  {
    key: "facebook",
    label: "Facebook Fanpage",
    href: "https://www.facebook.com/people/Grounds2Dish/61576865499705/",
    bg: "bg-[#1877F2] hover:bg-[#3b86f6]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true">
        <path fill="currentColor" d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.04H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.06 22 12.06Z"/>
      </svg>
    ),
  },
  {
    key: "zalo",
    label: "Chat Zalo",
    href: "https://zalo.me",
    bg: "bg-[#0068FF] hover:bg-[#2b84ff]",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true">
        <rect x="6" y="6" width="36" height="30" rx="8" fill="currentColor" />
        <path d="M16 29h16l-9 9-7-9z" fill="currentColor" opacity=".9" />
        <text x="16" y="26" fontFamily="Arial, Helvetica, sans-serif" fontSize="12" fontWeight="700" fill="#fff">Z</text>
      </svg>
    ),
  },
  {
    key: "messenger",
    label: "Facebook Messenger",
    href: "https://m.me",
    bg: "bg-[#0084FF] hover:bg-[#2b9bff]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.02 2 10.98c0 2.78 1.37 5.27 3.57 6.96V22l3.26-1.79c.99.28 2.04.43 3.17.43 5.52 0 10-4.02 10-8.98S17.52 2 12 2Zm.9 9.14 2.92-3.09 3.18 3.09-6.1 3.86-2.81-2.78-3.9 2.78 6.1-3.86 2.61 1.9Z"/>
      </svg>
    ),
  },
];

/**
 * FloatingContactBar component
 * props:
 * - side: 'left' | 'right' (default: 'right')
 * - offsetTop: number (px), default 120
 * - items: array of { key, label, href, bg, icon } to extend/override defaults
 */
export default function FloatingContactBar({ side = "right", offsetTop = 120, vertical = "offset", items = DEFAULT_ITEMS }) {
  const sideClass = side === "left" ? "left-4" : "right-4";
  const verticalClass = vertical === "middle" ? "top-1/2 -translate-y-1/2" : "";

  return (
    <div
      className={`fixed ${sideClass} ${verticalClass} z-40`}
      style={vertical === "middle" ? undefined : { top: offsetTop }}
      aria-label="Floating contact bar"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`group relative rounded-2xl md:rounded-2xl shadow-lg ${item.bg} focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black/5 transition-transform duration-200 hover:scale-105 active:scale-95`}
            title={item.label}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              {item.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


