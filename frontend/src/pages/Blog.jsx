import { useEffect, useState } from "react";
import { Link } from "react-router";
import BlogCard from "./BlogCard";
import { apiClient } from "../constants/apiUrl";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await apiClient("/blogs");
                setBlogs(data);
            } catch (error) {
                console.error("Lỗi khi tải blogs:", error.message);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
            {/* Hero / Header */}
            <div className="absolute inset-0 bg-black/20"></div>

            <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 50%, #1a0f1a 100%)' }}>
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
                                Home
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
                    Latest Posts
                </h2>
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs available yet.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.slice(0, 6).map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}

                {blogs.length > 6 && (
                    <div className="mt-12 text-center">
                        <Link
                            to="/blog"
                            className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                        >
                            View More Blogs →
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
