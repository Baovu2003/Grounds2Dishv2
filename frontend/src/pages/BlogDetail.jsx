import { ArrowLeft, Calendar, User } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useLocation } from "react-router";
export default function BlogDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blog = state?.blog;
  console.log("blog", blog);
  //   const blogId = params.id
  //   const blog = sampleBlogs.find((b) => b._id === blogId)

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Không tìm thấy bài viết
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header với nút quay lại */}
      <div className="bg-card border-b px-6 py-4 max-w-4xl mx-auto flex items-center justify-between">
        {/* Breadcrumb */}
        <nav className="text-lg md:text-xl">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                to="/"
                className="text-gray-500 hover:text-primary font-semibold relative group"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-gray-700 font-bold animate-text-glow">Blog</li>
          </ol>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </button>
      </div>

      {/* Nội dung bài viết */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Ảnh đại diện */}
        <div className="mb-8">
          <img
            // src={blog.thumbnail || "/placeholder.svg"}
            src={"/images/header-background1.jpg"}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Tiêu đề và meta info */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
              </time>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
            {blog.description}
          </p>
        </header>

        {/* Nội dung bài viết */}
        <div className="max-w-none">{formatPlainTextContent(blog.content)}</div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Đăng ngày: {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang trước
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
