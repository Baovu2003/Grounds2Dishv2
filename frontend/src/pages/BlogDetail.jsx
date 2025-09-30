import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Tag, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useLocation } from "react-router";
import { useState } from "react";

export default function BlogDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blog = state?.blog;
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Related blogs (mock data)
  const relatedBlogs = [
    {
      _id: "related-1",
      title: "Cách bảo quản sản phẩm bền vững",
      thumbnail: "/images/anh2.jpg",
      createdAt: "2025-01-10T10:00:00Z",
      readTime: "4 phút đọc"
    },
    {
      _id: "related-2", 
      title: "Xu hướng tiêu dùng xanh 2025",
      thumbnail: "/images/anh3.jpg",
      createdAt: "2025-01-08T14:00:00Z",
      readTime: "6 phút đọc"
    },
    {
      _id: "related-3",
      title: "Lợi ích môi trường của tái chế",
      thumbnail: "/images/anh1.jpg",
      createdAt: "2025-01-05T16:00:00Z",
      readTime: "5 phút đọc"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setShowShare(!showShare);
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.description,
        url: window.location.href,
      });
    }
  };

  const formatPlainTextContent = (content) => {
    return content
      .split("\n\n") // Split by double line breaks to create paragraphs
      .map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim();
        if (!trimmedParagraph) return null;

        // Check if it's a title (standalone line that doesn't start with -)
        const lines = trimmedParagraph.split("\n");
        if (lines.length === 1 && !lines[0].startsWith("-")) {
          return (
            <h3
              key={index}
              className="text-xl font-semibold text-foreground mt-6 mb-3"
            >
              {trimmedParagraph}
            </h3>
          );
        }

        // Handle bullet points
        if (trimmedParagraph.includes("\n-")) {
          const [title, ...bulletPoints] = lines;
          return (
            <div key={index} className="mb-4">
              {title && !title.startsWith("-") && (
                <h4 className="font-medium text-foreground mb-2">{title}</h4>
              )}
              <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                {bulletPoints
                  .filter((point) => point.trim().startsWith("-"))
                  .map((point, bulletIndex) => (
                    <li key={bulletIndex} className="leading-relaxed">
                      {point.trim().substring(1).trim()}
                    </li>
                  ))}
              </ul>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="text-foreground leading-relaxed mb-4">
            {trimmedParagraph}
          </p>
        );
      })
      .filter(Boolean);
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-12 h-12 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Không tìm thấy bài viết
          </h1>
          <p className="text-neutral-600 mb-8">
            Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
              boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
      {/* Header với nút quay lại */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-neutral-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Breadcrumb */}
          <nav className="text-lg">
            <ol className="flex items-center space-x-3">
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
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium relative group"
                  onMouseEnter={(e) => e.target.style.color = '#20161F'}
                  onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                >
                  Blog
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all group-hover:w-full"
                        style={{ backgroundColor: '#20161F' }}></span>
                </Link>
              </li>
              <li>
                <span className="text-neutral-400">/</span>
              </li>
              <li className="text-neutral-900 font-semibold truncate max-w-xs">
                {blog.title}
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all duration-300"
            onMouseEnter={(e) => {
              e.target.style.color = '#20161F';
              e.target.style.backgroundColor = 'rgba(32, 22, 31, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#374151';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Ảnh đại diện */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-neutral-100 to-neutral-200">
              <div className="relative w-full h-64 md:h-96 flex items-center justify-center">
                <img
                  src={blog.thumbnail || "/images/anh1.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/anh1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {/* Tiêu đề và meta info */}
            <header className="mb-8">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white shadow-medium"
                      style={{ backgroundColor: '#20161F' }}>
                  <Tag className="w-4 h-4 mr-1" />
                  {blog.category || 'Blog'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{blog.author || 'Grounds2Dish Team'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time>{new Date(blog.createdAt).toLocaleDateString("vi-VN")}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{blog.readTime || '5 phút đọc'}</span>
                </div>
              </div>

              <p className="text-xl text-neutral-700 leading-relaxed mb-8">
                {blog.description}
              </p>

              {/* Tags */}
              {blog.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isLiked 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-neutral-600 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Đã thích' : 'Thích'}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </header>

            {/* Nội dung bài viết */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-neutral-800 leading-relaxed space-y-6">
                {formatPlainTextContent(blog.content)}
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-neutral-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {blog.author || 'Grounds2Dish Team'}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Đội ngũ chuyên gia của Grounds2Dish, cam kết mang đến những insights sâu sắc về lối sống bền vững và công nghệ tái chế.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                  Bài viết liên quan
                </h3>
                <div className="space-y-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      to={`/blog/${relatedBlog._id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 flex-shrink-0">
                          <img
                            src={relatedBlog.thumbnail}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = "/images/anh1.jpg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-neutral-700 transition-colors duration-300">
                            {relatedBlog.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                            <Clock className="w-3 h-3" />
                            <span>{relatedBlog.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    Đăng ký nhận tin
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Nhận những bài viết mới nhất về lối sống bền vững
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
                    style={{ 
                      focusRingColor: 'rgba(32, 22, 31, 0.2)',
                      focusBorderColor: '#20161F'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#20161F';
                      e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    className="w-full px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                      boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
                    }}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
