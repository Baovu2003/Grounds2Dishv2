import React, { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowRight, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import AddBlogForm from "./AddBlogForm";

const Blog = () => {
  // Blog mẫu với thêm thông tin
  const sampleBlogs = [
    {
      _id: "1",
      title: "Sản phẩm cà phê bền vững - Tương lai của tiêu dùng xanh",
      description:
        "Khám phá cách chúng tôi tận dụng bã cà phê để tạo ra ly tái chế thân thiện môi trường, mang lại giải pháp bền vững cho cuộc sống hiện đại.",
      createdAt: "2025-01-15T12:00:00Z",
      thumbnail: "/images/anh1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Grounds2Dish Team",
      readTime: "5 phút đọc",
      category: "Sustainability",
      tags: ["Cà phê", "Bền vững", "Tái chế"]
    },
    {
      _id: "2",
      title: "Quy trình sản xuất ly tái chế từ bã cà phê",
      description:
        "Tìm hiểu các bước chế tạo ly từ phụ phẩm cà phê, vừa bền đẹp vừa giảm rác thải nhựa. Công nghệ tiên tiến mang lại sản phẩm chất lượng cao.",
      createdAt: "2025-01-12T09:30:00Z",
      thumbnail: "/images/anh2.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Tech Team",
      readTime: "7 phút đọc",
      category: "Technology",
      tags: ["Công nghệ", "Sản xuất", "Innovation"]
    },
    {
      _id: "3",
      title: "AirX Coffee trên thị trường quốc tế - Hành trình toàn cầu",
      description:
        "AirX Coffee đã xuất hiện tại hơn 50 quốc gia, mang sản phẩm xanh đến tay người tiêu dùng toàn cầu. Khám phá câu chuyện thành công.",
      createdAt: "2025-01-10T14:15:00Z",
      thumbnail: "/images/anh3.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Marketing Team",
      readTime: "6 phút đọc",
      category: "Business",
      tags: ["Thị trường", "Quốc tế", "Thành công"]
    },
    {
      _id: "4",
      title: "Lợi ích môi trường của sản phẩm tái chế",
      description:
        "Tìm hiểu về tác động tích cực của việc sử dụng sản phẩm tái chế từ bã cà phê đối với môi trường và xã hội.",
      createdAt: "2025-01-08T16:20:00Z",
      thumbnail: "/images/header-background1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Environmental Team",
      readTime: "4 phút đọc",
      category: "Environment",
      tags: ["Môi trường", "Lợi ích", "Xanh"]
    },
    {
      _id: "5",
      title: "Cách sử dụng và bảo quản sản phẩm bền vững",
      description:
        "Hướng dẫn chi tiết cách sử dụng và bảo quản các sản phẩm từ bã cà phê để đảm bảo tuổi thọ và hiệu quả tối đa.",
      createdAt: "2025-01-05T11:45:00Z",
      thumbnail: "/images/logo1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Product Team",
      readTime: "3 phút đọc",
      category: "Guide",
      tags: ["Hướng dẫn", "Bảo quản", "Sử dụng"]
    },
    {
      _id: "6",
      title: "Tương lai của ngành công nghiệp tái chế",
      description:
        "Dự đoán và phân tích xu hướng phát triển của ngành công nghiệp tái chế trong tương lai, đặc biệt là từ phụ phẩm nông nghiệp.",
      createdAt: "2025-01-03T13:30:00Z",
      thumbnail: "/images/anh1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Research Team",
      readTime: "8 phút đọc",
      category: "Future",
      tags: ["Tương lai", "Xu hướng", "Phát triển"]
    },
    {
      _id: "7",
      title: "Công nghệ xử lý bã cà phê tiên tiến",
      description:
        "Khám phá các công nghệ hiện đại trong việc xử lý và tái chế bã cà phê thành các sản phẩm hữu ích.",
      createdAt: "2025-01-01T10:00:00Z",
      thumbnail: "/images/anh2.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Tech Innovation Team",
      readTime: "6 phút đọc",
      category: "Technology",
      tags: ["Công nghệ", "Xử lý", "Tiên tiến"]
    },
    {
      _id: "8",
      title: "Lợi ích kinh tế của sản phẩm bền vững",
      description:
        "Phân tích chi tiết về lợi ích kinh tế khi chuyển đổi sang sử dụng các sản phẩm bền vững từ bã cà phê.",
      createdAt: "2024-12-28T15:45:00Z",
      thumbnail: "/images/anh3.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Economic Research Team",
      readTime: "7 phút đọc",
      category: "Business",
      tags: ["Kinh tế", "Lợi ích", "Bền vững"]
    },
    {
      _id: "9",
      title: "Hướng dẫn phân loại rác thải hiệu quả",
      description:
        "Các bước chi tiết để phân loại và xử lý rác thải một cách hiệu quả, góp phần bảo vệ môi trường.",
      createdAt: "2024-12-25T09:20:00Z",
      thumbnail: "/images/header-background1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Environmental Team",
      readTime: "5 phút đọc",
      category: "Environment",
      tags: ["Phân loại", "Rác thải", "Hiệu quả"]
    },
    {
      _id: "10",
      title: "Xu hướng tiêu dùng xanh 2025",
      description:
        "Dự đoán các xu hướng tiêu dùng xanh sẽ thống trị thị trường trong năm 2025 và những năm tiếp theo.",
      createdAt: "2024-12-22T14:30:00Z",
      thumbnail: "/images/logo1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Market Research Team",
      readTime: "9 phút đọc",
      category: "Future",
      tags: ["Xu hướng", "Tiêu dùng", "2025"]
    },
    {
      _id: "11",
      title: "Cách tạo không gian sống bền vững",
      description:
        "Những gợi ý thiết thực để tạo ra một không gian sống thân thiện với môi trường và bền vững.",
      createdAt: "2024-12-20T11:15:00Z",
      thumbnail: "/images/anh1.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Lifestyle Team",
      readTime: "4 phút đọc",
      category: "Guide",
      tags: ["Không gian", "Sống", "Bền vững"]
    },
    {
      _id: "12",
      title: "Nghiên cứu khoa học về tái chế bã cà phê",
      description:
        "Tổng hợp các nghiên cứu khoa học mới nhất về quá trình tái chế bã cà phê và ứng dụng thực tế.",
      createdAt: "2024-12-18T16:00:00Z",
      thumbnail: "/images/anh2.jpg",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
      author: "Science Research Team",
      readTime: "10 phút đọc",
      category: "Technology",
      tags: ["Nghiên cứu", "Khoa học", "Tái chế"]
    }
  ];

  const [blogs, setBlogs] = useState(sampleBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const handleAddBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    alert("Thêm blog thành công!");
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
      {/* Hero Section */}
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

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
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

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
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
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="text-neutral-600 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
                style={{ 
                  focusRingColor: 'rgba(32, 22, 31, 0.2)',
                  focusBorderColor: '#20161F'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "All" ? "Tất cả danh mục" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog, index) => (
            <article
              key={blog._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-neutral-100 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={`/blog/${blog._id}`}
                state={{ blog }}
                className="block h-full"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-medium"
                          style={{ backgroundColor: '#20161F' }}>
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-neutral-900 mb-3 leading-tight line-clamp-2 group-hover:text-neutral-700 transition-colors duration-300">
                      {blog.title}
                    </h2>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {blog.description}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 rounded-lg text-xs font-medium text-neutral-600 bg-neutral-100"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: '#20161F' }}>
                          Đọc thêm
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    style={{ color: '#20161F' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-neutral-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:text-neutral-900 hover:bg-neutral-100"
              onMouseEnter={(e) => {
                if (currentPage > 1) {
                  e.target.style.color = '#20161F';
                  e.target.style.backgroundColor = 'rgba(32, 22, 31, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage > 1) {
                  e.target.style.color = '#6b7280';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Trước
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'text-white shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  style={currentPage === page ? {
                    background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                    boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)',
                    color: 'white'
                  } : {
                    color: '#6b7280'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== page) {
                      e.target.style.color = '#20161F';
                      e.target.style.backgroundColor = 'rgba(32, 22, 31, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== page) {
                      e.target.style.color = '#6b7280';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-neutral-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:text-neutral-900 hover:bg-neutral-100"
              onMouseEnter={(e) => {
                if (currentPage < totalPages) {
                  e.target.style.color = '#20161F';
                  e.target.style.backgroundColor = 'rgba(32, 22, 31, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage < totalPages) {
                  e.target.style.color = '#6b7280';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Sau
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-neutral-600 mb-6">
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
