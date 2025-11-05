import React from "react";

// Default social items with brand colors
const DEFAULT_ITEMS = [
    {
        key: "facebook",
        label: "Facebook Fanpage",
        href: "https://www.facebook.com/people/Grounds2Dish/61576865499705/",
        bg: "bg-[#1877F2] hover:bg-[#3b86f6]",
        icon: (
            <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6"
                aria-hidden="true"
            >
                <path
                    fill="#fff"
                    d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.04H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.06 22 12.06Z"
                />
            </svg>
        ),
    },
    {
        key: "zalo",
        label: "Chat Zalo",
        href: "https://zalo.me/84963908311", // ✅ Chat trực tiếp với số 0963 908 311
        bg: "bg-white hover:bg-gray-100",
        icon: "/images/Icon_of_Zalo.svg.webp",
    },

    {
        key: "tiktok",
        label: "TikTok",
        href: "https://www.tiktok.com/@grounds2dish?fbclid=IwY2xjawNtxZFleHRuA2FlbQIxMABicmlkETE2c2FVanhkRDZhYWhBWktBAR5EjtpVSiA1KQCSn3swA3QRF3JPlCu_i4XEsStPvwc6GGFBDNz42OfYbiRigg_aem_HicZJUM9RLDZeI_dsXQfew",
        bg: "bg-[#000000] hover:bg-[#222]",
        icon: "/images/tiktok-01.jpg",
    },
    {
        key: "messenger",
        label: "Facebook Messenger",
        href: "https://www.facebook.com/messages/t/628654717005233",
        bg: "bg-white hover:bg-gray-100",
        icon: "/images/message.png", // ✅ Sửa lại đường dẫn
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
                            {typeof item.icon === "string" ? (
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                />
                            ) : (
                                item.icon
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}