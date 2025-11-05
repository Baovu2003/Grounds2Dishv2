import { useEffect, useState } from "react";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import { apiClient } from "../constants/apiUrl";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await apiClient("/blogs");
                // Xử lý response - đảm bảo luôn là array
                const blogsData = Array.isArray(data) ? data : (data?.data || []);
                setBlogs(blogsData);
            } catch (error) {
                console.error("Lỗi khi tải blogs:", error.message);
                setBlogs([]);
            }
        };
        fetchBlogs();
    }, []);

    const totalPages = Math.max(1, Math.ceil((Array.isArray(blogs) ? blogs.length : 0) / pageSize));
    const startIdx = (currentPage - 1) * pageSize;
    const pageBlogs = Array.isArray(blogs) ? blogs.slice(startIdx, startIdx + pageSize) : [];
    const gotoPage = (p) => {
        if (p < 1 || p > totalPages) return;
        setCurrentPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
            {/* Hero / Header */}
            <div className="absolute "></div>

            <section className="relative py-20 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 50%, #1a0f1a 100%)' }}
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-white/80 mb-4">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                            Blog & Insights
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Khám phá những câu chuyện, xu hướng và insights về lối sống bền vững từ Grounds2Dish
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-32 h-32 opacity-10">
                    <img src="/images/logo1.jpg" alt="Decorative" className="w-full h-full object-contain rounded-full" />
                </div>
                <div className="absolute bottom-10 left-10 w-24 h-24 opacity-10">
                    <img src="/images/logo.jpg" alt="Decorative" className="w-full h-full object-contain rounded-full" />
                </div>
            </section>

            {/* Blog preview section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <nav className="mb-12">
                    <ol className="flex items-center space-x-3 text-lg">
                        <li>
                            <Link
                                to="/"
                                className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium relative group"
                                onMouseEnter={(e) => e.target.style.color = '#20161F'}
                                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                            >
                                Trang chủ
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all group-hover:w-full"
                                    style={{ backgroundColor: '#20161F' }}></span>
                            </Link>
                        </li>
                        <li>
                            <span className="text-neutral-400">/</span>
                        </li>
                        <li className="text-neutral-900 font-semibold">
                            Blog
                        </li>
                    </ol>
                </nav>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Các blog của chúng tôi
                </h2>
                {!Array.isArray(blogs) || blogs.length === 0 ? (
                    <p className="text-center text-gray-500">Không có blog nào để hiển thị</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(pageBlogs) && pageBlogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}

                {Array.isArray(blogs) && blogs.length > pageSize && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <button
                            onClick={() => gotoPage(currentPage - 1)}
                            className="px-3 py-2 rounded-lg bg-neutral-200 text-neutral-800 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => gotoPage(i + 1)}
                                className={`px-3 py-2 rounded-lg border ${currentPage === i + 1 ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-800 border-neutral-200'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => gotoPage(currentPage + 1)}
                            className="px-3 py-2 rounded-lg bg-neutral-200 text-neutral-800 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Tiếp
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
