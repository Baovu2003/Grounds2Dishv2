import React, { useState } from "react";
import { Link } from "react-router";
import AddBlogForm from "./AddBlogForm";

const Blog = () => {
  // Blog mẫu
  const sampleBlogs = [
    {
      _id: "1",
      title: "Sản phẩm cà phê bền vững",
      description:
        "Khám phá cách chúng tôi tận dụng bã cà phê để tạo ra ly tái chế thân thiện môi trường.",
      createdAt: "2025-09-28T12:00:00Z",
      thumbnail: "https://source.unsplash.com/400x300/?coffee",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
    },
    {
      _id: "2",
      title: "Quy trình sản xuất ly tái chế",
      description:
        "Tìm hiểu các bước chế tạo ly từ phụ phẩm cà phê, vừa bền đẹp vừa giảm rác thải nhựa.",
      createdAt: "2025-09-27T09:30:00Z",
      thumbnail: "https://source.unsplash.com/400x300/?coffee,beans",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
    },
    {
      _id: "3",
      title: "AirX Coffee trên thị trường quốc tế",
      description:
        "AirX Coffee đã xuất hiện tại hơn 50 quốc gia, mang sản phẩm xanh đến tay người tiêu dùng toàn cầu.",
      createdAt: "2025-09-26T14:15:00Z",
      thumbnail: "https://source.unsplash.com/400x300/?coffee,cup",
      content: `Giới thiệu về sản phẩm cà phê bền vững\n\nQuy trình sản xuất\n- Thu gom bã cà phê\n- Xử lý và làm sạch\n- Ép thành ly\n- Sấy khô và hoàn thiện`,
    },
  ];

  const [blogs, setBlogs] = useState(sampleBlogs);

  const handleAddBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    alert("Thêm blog thành công!");
  };

  return (
    <div className="bg-base-100 font-sans min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-lg md:text-xl">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                to="/"
                className="text-gray-500 hover:text-primary transition-colors text-lg md:text-xl font-semibold relative group"
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <span className="text-gray-400 text-lg md:text-xl">/</span>
            </li>
            <li className="relative text-gray-700 font-bold text-lg md:text-2xl animate-text-glow">
              Blog
            </li>
          </ol>
        </nav>
        {/* <AddBlogForm onAdd={handleAddBlog} /> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col"
            >
              <Link
                // to={`/blog/${blog._id}`}
                //  className="flex flex-col flex-1"

                to={`/blog/${blog._id}`}
                state={{ blog }} // <-- truyền blog hiện tại qua state
                className="flex flex-col flex-1"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h2 className="text-xl font-semibold text-base-content mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                  </div>
                  <time className="text-sm text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
