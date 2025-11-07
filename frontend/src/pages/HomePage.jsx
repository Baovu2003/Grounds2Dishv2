import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useCartStore from "../store/useCartStore";
import { apiClient } from "../constants/apiUrl";
import { ShoppingCart, X } from "lucide-react";

const HomePage = ({ productSeller = [] }) => {
  const { addItem } = useCartStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImageModal, setSelectedImageModal] = useState(null); // { images: [], currentIndex: 0, name: string }

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await apiClient("/product-categories");
      console.log("Data from API:", data);
      console.log("Is array?", Array.isArray(data));

      // setCategories(data);
      setCategories(Array.isArray(data) ? data : data.categories || []);
    } catch (error) {
      console.error("Lỗi khi fetch danh mục:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("categories", categories);
  // Gọi API lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const result = await apiClient("/products");
      console.log("result", result);
      setProducts(result || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Slider data
  const slides = [
    {
      bg: "/images/background.jpg",
      title: "Grounds2Dish",
      subtitle: "Biến bã cà phê thành giá trị mới!",
      logos: [
        "/images/IMG_7628.JPG",
        "/images/IMG_7626.JPG",
        "/images/IMG_3309.JPG",
        "/images/IMG_3313.JPG",
      ],
      objectFit: "contain",
      objectPosition: "center",
      gradientFrom: "rgba(0,0,0,0.3)",
      gradientVia: "rgba(0,0,0,0.4)",
      gradientTo: "rgba(0,0,0,0.6)",
    },
    {
      bg: "/images/571413455_122143453652895516_428131650592091175_n.jpg",
      // title: "Sản Phẩm Xanh",
      // subtitle: "Thân thiện với môi trường, bền vững cho tương lai",
      logos: [
        "/images/IMG_7628.JPG",
        "/images/IMG_7626.JPG",
        "/images/IMG_3309.JPG",
        "/images/IMG_3313.JPG",
      ],
      objectFit: "contain",
      objectPosition: "center",
      gradientFrom: "rgba(0,0,0,0.15)",
      gradientVia: "rgba(0,0,0,0.25)",
      gradientTo: "rgba(0,0,0,0.4)",
    },
    {
      bg: "/images/IMG_7654.JPG",
      title: "Chất Lượng Cao",
      subtitle: "Từ những hạt cà phê Việt Nam tươi ngon",
      logos: [
        "/images/IMG_7628.JPG",
        "/images/IMG_7626.JPG",
        "/images/IMG_3309.JPG",
        "/images/IMG_3313.JPG",
      ],
      objectFit: "contain",
      objectPosition: "center",
      gradientFrom: "rgba(0,0,0,0.15)",
      gradientVia: "rgba(0,0,0,0.25)",
      gradientTo: "rgba(0,0,0,0.4)",
    },
    {
      bg: "/images/576818654_122145409382895516_5835231204867649262_n.jpg",
      title: "Tái Chế Sáng Tạo",
      subtitle: "Mỗi sản phẩm là một câu chuyện về yêu thương môi trường",
      logos: [
        "/images/IMG_7628.JPG",
        "/images/IMG_7626.JPG",
        "/images/IMG_3309.JPG",
        "/images/IMG_3313.JPG",
      ],
      objectFit: "contain",
      objectPosition: "center",
      gradientFrom: "rgba(0,0,0,0.15)",
      gradientVia: "rgba(0,0,0,0.25)",
      gradientTo: "rgba(0,0,0,0.4)",
    },
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  console.log("Products", products);

  if (loading) return <p className="p-5">Đang tải sản phẩm...</p>;
  // Use sample data if no products provided
  const displayProducts = productSeller.length > 0 ? productSeller : products;

  const handleAddToCart = (product) => {
    addItem({
      _id: product._id,
      name: product.title,
      price: product.price,
      thumbnail:
        product.thumbnail?.length > 0 ? product.thumbnail : "/placeholder.svg",
      description: product.description || "Sản phẩm bền vững từ bã cà phê",
    });
  };

  return (
    <div >
      {/* Hero Slider Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-full">
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;

            return (
              <div
                key={index}
                className={`absolute inset-0 overflow-hidden ${isActive ? "z-10" : "z-0"
                  }`}
                style={{
                  transform: isActive
                    ? "translateX(0)"
                    : index < currentSlide
                      ? "translateX(-100%)"
                      : "translateX(100%)",
                  transition: "transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
                  }}
                >
                  <img
                    className={`w-full h-full ${slide.objectFit === "contain"
                        ? "object-contain"
                        : "object-cover"
                      } ${slide.objectPosition || "object-center"}`}
                    src={slide.bg}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: slide.objectFit || "contain",
                      objectPosition: slide.objectPosition || "center",
                    }}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${slide.gradientFrom || "rgba(0,0,0,0.3)"
                      }, ${slide.gradientVia || "rgba(0,0,0,0.4)"}, ${slide.gradientTo || "rgba(0,0,0,0.6)"
                      })`,
                  }}
                ></div>

                {/* Content */}
                <div
                  className={`relative z-10 h-full flex items-center justify-center text-center text-white transition-all duration-700 delay-300 ${isActive
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                    }`}
                >
                  <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold drop-shadow-2xl tracking-tight text-white">
                        {slide.title}
                      </h1>
                      <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-amber-600 mx-auto rounded-full"></div>
                    </div>
                    <p className="text-xl md:text-2xl drop-shadow-lg font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>

                {/* Decorative elements with animation */}
                <div
                  className={`absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-1000 delay-200 overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 ${isActive
                      ? "translate-x-0 translate-y-0 opacity-30 scale-100"
                      : "-translate-x-full translate-y-full opacity-0 scale-75"
                    }`}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      src={slide.logos[0]}
                      alt="Decorative"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-1000 delay-300 overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 ${isActive
                      ? "translate-x-0 translate-y-0 opacity-30 scale-100"
                      : "translate-x-full translate-y-full opacity-0 scale-75"
                    }`}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      src={slide.logos[1]}
                      alt="Decorative"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div
                  className={`absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-1000 delay-400 overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 ${isActive
                      ? "translate-x-0 translate-y-0 opacity-30 scale-100"
                      : "-translate-x-full -translate-y-full opacity-0 scale-75"
                    }`}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      src={slide.logos[2]}
                      alt="Decorative"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div
                  className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-all duration-1000 delay-500 overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 ${isActive
                      ? "translate-x-0 translate-y-0 opacity-30 scale-100"
                      : "translate-x-full -translate-y-full opacity-0 scale-75"
                    }`}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      src={slide.logos[3]}
                      alt="Decorative"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${currentSlide === index
                  ? "w-12 h-3 bg-white shadow-lg"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>
      {/* SẢN PHẨM BÁN CHẠY */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 mb-4">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <div className="text-sm text-primary-600 uppercase tracking-[0.3em] mb-4 font-semibold">
              SUSTAINABLE COLLECTION
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
              Sản Phẩm Bán Chạy
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Khám phá những sản phẩm được yêu thích nhất, được làm từ bã cà phê
              tái chế với chất lượng cao
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts && displayProducts.length > 0 ? (
              displayProducts.slice(0, 4).map((product, index) => (
                <div
                  key={product._id}
                  className="group card h-full flex flex-col hover:shadow-large transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.thumbnail?.[0] || "/images/placeholder.jpg"}
                      alt={product.title}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-medium ${product.status === "active"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-gray-400 to-gray-600"
                          }`}
                      >
                        {product.status === "active" ? "Đang bán" : "Ngừng bán"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <Link
                        to={`/productdetail/${product._id}`}
                        className="block max-w-full font-semibold text-lg text-neutral-800 
                hover:text-primary-600 transition-colors duration-300 mb-2 
                group-hover:underline 
                overflow-hidden text-ellipsis 
                [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] 
                break-words"
                      >
                        {product.title}
                      </Link>

                      <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "#20161F" }}
                      >
                        {typeof product.price === "number"
                          ? product.price.toLocaleString("vi-VN") + "₫"
                          : "Liên hệ"}
                      </div>
                    </div>

                    {product.status === "active" && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary w-full mt-5"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 lg:h-4 lg:w-4" />
                          Thêm vào giỏ
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-xl text-center py-10 font-bold">
                Rất xin lõi quý khách vì hiện tại bên tôi chưa có sản phẩm nào
                để hiển thị
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              <span>Xem tất cả sản phẩm</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 bg-base-100">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <div className="text-2xl text-accent mb-2 animate-pulse">~~~</div>
          <div className="text-sm text-base-content uppercase tracking-[0.3em] mb-4 font-semibold">
            SUSTAINABLE COLLECTION
          </div>
          <h2 className="text-4xl font-extrabold text-base-content">
            DANH MỤC SẢN PHẨM
          </h2>
        </div>

        {/* Auto Scroll Container */}
        <div className="relative overflow-hidden">
          <div className="flex justify-center gap-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(categories || []).slice(0, 4).map((cat) => (
                <div
                  key={cat._id}
                  className="group relative w-full max-w-sm sm:max-w-md lg:max-w-xs 
             aspect-[4/5] rounded-3xl overflow-hidden 
             shadow-large hover:shadow-xl transition-all duration-700 
             transform hover:-translate-y-3 hover:scale-105 bg-white"
                >
                  <figure className="h-full w-full">
                    <img
                      src={cat.thumbnail || "/images/placeholder.jpg"}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-3  text-white/90">
                      {cat.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4">
                      {cat.description || "Không có mô tả cho danh mục này."}
                    </p>
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                      <Link to="/shop">Khám phá</Link>
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                      {cat.slug?.toUpperCase() || "Danh mục"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="px-8 py-16 bg-base-100">
        <div className="text-center mb-12">
          <div className="text-2xl text-green-500 mb-2 animate-pulse">~~~</div>
          <div className="text-sm text-base-content uppercase tracking-[0.3em] mb-4">
            SUSTAINABLE COLLECTION
          </div>
          <h2 className="text-4xl font-extrabold text-base-content">
            Nguồn gốc của sản phẩm
          </h2>
        </div>

        <div className="flex justify-center">
          <video
            className="w-full max-w-3xl rounded-lg shadow-lg"
            controls
            autoPlay
            loop
            muted
            poster="/images/header-background1.jpg"
          >
            <source
              src="https://www.youtube.com/watch?v=EZc1TE0bml0"
              type="video/mp4"
            />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      </section> */}

      <section className="relative py-20 bg-gradient-to-br from-neutral-50 via-green-50/30 to-emerald-50/20">
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="space-y-12">
            {/* Certifications Section */}
            <div className="space-y-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                  Về Giấy Chứng Nhận & Kiểm Định
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
              </div>

              {/* Category 1: Ống hút cỏ bàng */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2 flex items-center gap-3">
                    <span className="text-2xl">🌾</span>
                    Ống Hút Cỏ Bàng
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Các giấy kiểm định và chứng nhận chất lượng cho sản phẩm ống
                    hút cỏ bàng
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[
                    {
                      name: "Eurofins Certification",
                      images: [
                        "/ONG_HUT/TEST-EROFINS-GRASS-STRAWS-OF-GREEN-FUTURE-VN-PAGE-01.jpg",
                        "/ONG_HUT/TEST-EROFINS-GRASS-STRAWS-OF-GREEN-FUTURE-VN-PAGE-02.jpg",
                      ],
                    },
                    {
                      name: "QUATEST Certification",
                      images: [
                        "/ONG_HUT/TEST-QUATEST-3-ONG-HUT-CO-PAGE-01.jpg",
                        "/ONG_HUT/TEST-QUATEST-3-ONG-HUT-CO-PAGE-02.jpg",
                        "/ONG_HUT/TEST-QUATEST-3-ONG-HUT-CO-PAGE-03.jpg",
                      ],
                    },
                    {
                      name: "SGS UK Market Certification",
                      images: [
                        "/ONG_HUT/TEST-SGS-FOR-UK-MARKET-01.jpg",
                        "/ONG_HUT/TEST-SGS-FOR-UK-MARKET-02.jpg",
                      ],
                    },
                    {
                      name: "General Certificates",
                      images: [
                        "/ONG_HUT/z4215838562147_bd4caec121c87e2a4667acfe1579da32.jpg",
                        "/ONG_HUT/z4215838562713_5d43afba86eadc7a01ac228bb4f1a592.jpg",
                        "/ONG_HUT/z4215838564230_b5afab2a28254181e0b90e8088a41abe.jpg",
                      ],
                    },
                  ].map((cert, index) => {
                    // ✅ Mã hóa URL an toàn (tránh lỗi khi có dấu cách / ký tự đặc biệt)
                    const encodedImages = cert.images.map((img) => {
                      const pathParts = img.split("/");
                      return pathParts
                        .map((part, i) =>
                          i === 0 ? part : encodeURIComponent(part)
                        )
                        .join("/");
                    });

                    return (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedImageModal({
                            images: encodedImages,
                            currentIndex: 0,
                            name: cert.name,
                          })
                        }
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 border-2 border-neutral-200 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                      >
                        <div className="absolute inset-0 w-full h-full">
                          <img
                            src={encodedImages[0]}
                            alt={cert.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Hiệu ứng overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-xs text-white font-medium line-clamp-2 mb-1">
                              {cert.name}
                            </p>
                            <p className="text-xs text-white/80">
                              {cert.images.length} trang
                            </p>
                          </div>
                        </div>

                        {/* Badge hiển thị số lượng ảnh */}
                        {cert.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            {cert.images.length} ảnh
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Cốc, dao dĩa muỗng */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2 flex items-center gap-3">
                    <span className="text-2xl">☕</span>
                    Cốc, Dao Dĩa Muỗng
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Các giấy chứng nhận và kiểm định chất lượng cho sản phẩm
                    cốc, dao, dĩa, muỗng từ bã cà phê
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: "SGS Certification 2020",
                      images: [
                        "/COC/1. SGS_Certification Products_2020_Full-images-0.jpg",
                        "/COC/1. SGS_Certification Products_2020_Full-images-1.jpg",
                        "/COC/1. SGS_Certification Products_2020_Full-images-2.jpg",
                        "/COC/1. SGS_Certification Products_2020_Full-images-3.jpg",
                      ],
                    },
                    {
                      name: "TUV Certification Report",
                      images: [
                        "/COC/2. TUV_Certification_R-248137090_report-images-1.jpg",
                      ],
                    },
                    {
                      name: "BPA Testing Certification",
                      images: [
                        "/COC/3. BPA Testing Cerfitication-images-0.jpg",
                        "/COC/3. BPA Testing Cerfitication-images-1.jpg",
                      ],
                    },
                    {
                      name: "Europins Certification",
                      images: [
                        "/COC/4. Europins-images-0.jpg",
                        "/COC/4. Europins-images-1.jpg",
                        "/COC/4. Europins-images-2.jpg",
                        "/COC/4. Europins-images-3.jpg",
                      ],
                    },
                    {
                      name: "Quality Assurance & Testing",
                      images: ["/COC/6-1.jpg", "/COC/6-2.jpg", "/COC/6-3.jpg"],
                    },
                  ].map((cert, index) => {
                    const encodedImages = cert.images.map((img) => {
                      const pathParts = img.split("/");
                      return pathParts
                        .map((part, i) =>
                          i === 0 ? part : encodeURIComponent(part)
                        )
                        .join("/");
                    });

                    return (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedImageModal({
                            images: encodedImages,
                            currentIndex: 0,
                            name: cert.name,
                          })
                        }
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 border-2 border-neutral-200 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                      >
                        <div className="absolute inset-0 w-full h-full">
                          <img
                            src={encodedImages[0]}
                            alt={cert.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-xs text-white font-medium line-clamp-2 mb-1">
                              {cert.name}
                            </p>
                            <p className="text-xs text-white/80">
                              {cert.images.length} trang
                            </p>
                          </div>
                        </div>
                        {cert.images.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            {cert.images.length} ảnh
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedImageModal && (
         <div
        className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageModal(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[100vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 text-white">
              <h3 className="text-xl font-bold">{selectedImageModal.name}</h3>
              <button
                onClick={() => setSelectedImageModal(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative bg-white rounded-lg overflow-hidden flex-1 flex items-center justify-center">
              <img
                src={selectedImageModal.images[selectedImageModal.currentIndex]}
                alt={`${selectedImageModal.name} - Page ${selectedImageModal.currentIndex + 1
                  }`}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Navigation Arrows */}
              {selectedImageModal.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageModal({
                        ...selectedImageModal,
                        currentIndex:
                          selectedImageModal.currentIndex > 0
                            ? selectedImageModal.currentIndex - 1
                            : selectedImageModal.images.length - 1,
                      });
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageModal({
                        ...selectedImageModal,
                        currentIndex:
                          (selectedImageModal.currentIndex + 1) %
                          selectedImageModal.images.length,
                      });
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Page Indicator */}
              {selectedImageModal.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {selectedImageModal.currentIndex + 1} /{" "}
                  {selectedImageModal.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedImageModal.images.length > 1 && (
              <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-2">
                {selectedImageModal.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageModal({
                        ...selectedImageModal,
                        currentIndex: idx,
                      });
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageModal.currentIndex
                        ? "border-green-500 scale-110"
                        : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </section>

      {/* Image Modal */}
    
    </div>
  );
};

export default HomePage;
