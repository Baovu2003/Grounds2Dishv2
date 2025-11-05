import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Tag } from "lucide-react";
import { apiClient } from "../constants/apiUrl";
import BlogCard from "./BlogCard";

export default function BlogDeatil() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await apiClient(`/blogs/${id}`);
                setBlog(data);
            } catch (err) {
                console.error("Lỗi khi tải blog:", err.message);
            }
        };
        fetchBlog();
    }, [id]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const list = await apiClient("/blogs");
                // Xử lý response - đảm bảo luôn là array
                const blogsData = Array.isArray(list) ? list : (list?.data || []);
                const filtered = blogsData.filter((b) => b._id !== id).slice(0, 3);
                setRelated(filtered);
            } catch (err) {
                console.error("Lỗi khi tải gợi ý:", err.message);
                setRelated([]);
            }
        };
        fetchRelated();
    }, [id]);

    if (!blog) return <p className="p-6 text-center">Đang tải bài viết...</p>;

    const renderArticle = (text) => {
        if (!text) return { __html: "" };
        // Convert markdown images ![alt](url) to img tags and keep line breaks
        let html = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, url) => {
            return `<img src="${url}" alt="${alt}" class="my-6 rounded-xl shadow max-w-full mx-auto"/>`;
        });
        html = html.replace(/\n/g, "<br/>");
        return { __html: html };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 mt-5">
            {/* Header + Breadcrumb */}
            <div className=" sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <nav className="text-lg">
                        <ol className="flex items-center space-x-3">
                            <li>
                                <Link
                                    to="/"
                                    className="text-neutral-600 hover:text-neutral-900 font-medium"
                                >
                                    Home
                                </Link>
                            </li>
                            <li><span className="text-neutral-400">/</span></li>
                            <li><span className="text-neutral-900 font-semibold">Blog</span></li>
                            <li><span className="text-neutral-400">/</span></li>
                            <li className="text-neutral-900 font-semibold">{blog.title}</li>
                        </ol>
                        <div className="flex-1 border-t border-neutral-300"></div>

                    </nav>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Banner Image */}
                <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={blog.bannerImage || "/images/anh1.jpg"}
                        alt={blog.title}
                        className="w-full h-64 md:h-96 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>


                {/* Title + Meta */}
                <header className="mb-8">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white shadow"
                        style={{ backgroundColor: '#20161F' }}>
                        <Tag className="w-4 h-4 mr-1" /> {blog.category || "Blog"}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" /> {blog.author || "Grounds2Dish Team"}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {(blog.publishedAt)}
                        </div>

                    </div>


                </header>
                <div className="mt-6 leading-relaxed prose prose-neutral max-w-none" dangerouslySetInnerHTML={renderArticle(blog.article)}></div>
            </div>
            {related.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 pb-16">
                    <h3 className="text-2xl font-bold mb-6">Có thể bạn cũng thích</h3>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((b) => (
                            <BlogCard key={b._id} blog={b} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
