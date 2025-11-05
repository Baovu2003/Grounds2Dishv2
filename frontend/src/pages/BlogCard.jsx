import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export default function BlogCard({ blog }) {

    if (!blog) {
        return (
            <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg border border-amber-200/50 animate-pulse">
                <div className="h-56 bg-amber-200/30"></div>
                <div className="p-6 space-y-3">
                    <div className="h-6 bg-amber-200/30 rounded w-3/4"></div>
                    <div className="h-4 bg-amber-200/30 rounded w-full"></div>
                    <div className="h-4 bg-amber-200/30 rounded w-2/3"></div>
                </div>
            </div>
        )
    }

    const previewText = (() => {
        const raw = blog.article || "";
        // remove markdown image syntax and standalone urls for card preview
        const withoutImages = raw.replace(/!\[[^\]]*\]\(([^)]+)\)/g, "");
        const withoutUrls = withoutImages
            .replace(/https?:\/\/\S+/g, "")
            .replace(/\((https?:\/\/[^\s)]+)\)/g, "");
        return withoutUrls.replace(/\n+/g, " ").trim();
    })();

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                    src={`${blog.bannerImage}`}
                    alt={blog.title || "Blog post"}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                <div className="absolute top-3 left-3 bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                    Article
                </div>
            </div>

            <div className="p-6 space-y-4 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
                <h2 className="font-bold text-xl transition-colors duration-300 line-clamp-2 leading-snug">
                    {blog.title}
                </h2>

                <p className="text-sm leading-relaxed line-clamp-2">
                    {previewText.substring(0, 100)}...
                </p>

                <div className="flex items-center justify-between">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-2  font-semibold text-sm hover:text-amber-900 transition-all duration-300 group/link"
                    >
                        <span className="border-b-2 border-amber-700/0 transition-all duration-300">
                            Xem chi tiết
                        </span>
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-700 pointer-events-none"></div>
        </div>
    )
}
