import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useCartStore from "../store/useCartStore";
import { apiClient } from "../constants/apiUrl";

const HomePage = ({ productSeller = [] }) => {
  const { addItem } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const result = await apiClient("/products");
      console.log("result", result)
      setProducts(result || []);

    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products", products)

  if (loading) return <p className="p-5">Đang tải sản phẩm...</p>;
  // Use sample data if no products provided
  const displayProducts = productSeller.length > 0 ? productSeller : products;

  const handleAddToCart = (product) => {
    addItem({
      id: product.ProductId,
      name: product.ProductName,
      price: product.Price,
      thumbnail: product.ProductImages?.length > 0 ? product.ProductImages[0].ImageUrl : "/placeholder.svg",
      description: product.Description || "Sản phẩm bền vững từ bã cà phê"
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/header-background1.jpg"
          alt="Hero Banner"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-8 max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-2xl tracking-tight text-white">
              Grounds2Dish
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl drop-shadow-lg font-light leading-relaxed">
            Biến bã cà phê thành giá trị mới!
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20">
          <img
            className="w-full h-full object-contain"
            src="/images/logo1.jpg"
            alt="Decorative"
          />
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
          <div className="flex animate-scroll gap-8 py-4">
            {/* Duplicate cards for seamless loop */}
            <div className="flex gap-8 min-w-max">
              {/* Card 1 - Bộ bát đĩa */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh3.jpg"
                    alt="Bộ bát đĩa xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">Premium</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">BỘ BÁT ĐĨA</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Được làm từ bã cà phê & nhựa sinh học – an toàn, bền đẹp và thân thiện môi trường.
                  </p>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-xs font-bold">
                    BESTSELLER
                  </span>
                </div>
              </div>

              {/* Card 2 - Thìa sinh học */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh2.jpg"
                    alt="Thìa xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-accent-success uppercase tracking-wider">Eco-Friendly</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">THÌA SINH HỌC</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Giải pháp thay thế nhựa dùng một lần – tiện lợi và bảo vệ hành tinh.
                  </p>
                  <button className="bg-accent-success hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-accent-success px-3 py-1 rounded-full text-xs font-bold">
                    ECO
                  </span>
                </div>
              </div>

              {/* Card 3 - Quà tặng xanh */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh1.jpg"
                    alt="Quà tặng xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-accent-warm rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-accent-warm uppercase tracking-wider">Gift Set</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">QUÀ TẶNG XANH</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Món quà ý nghĩa từ bã cà phê – lan tỏa lối sống bền vững đến mọi người.
                  </p>
                  <button className="bg-accent-warm hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-accent-warm px-3 py-1 rounded-full text-xs font-bold">
                    GIFT
                  </span>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex gap-8 min-w-max">
              {/* Card 1 - Bộ bát đĩa */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh3.jpg"
                    alt="Bộ bát đĩa xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">Premium</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">BỘ BÁT ĐĨA</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Được làm từ bã cà phê & nhựa sinh học – an toàn, bền đẹp và thân thiện môi trường.
                  </p>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-xs font-bold">
                    BESTSELLER
                  </span>
                </div>
              </div>

              {/* Card 2 - Thìa sinh học */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh2.jpg"
                    alt="Thìa xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-accent-success uppercase tracking-wider">Eco-Friendly</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">THÌA SINH HỌC</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Giải pháp thay thế nhựa dùng một lần – tiện lợi và bảo vệ hành tinh.
                  </p>
                  <button className="bg-accent-success hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-accent-success px-3 py-1 rounded-full text-xs font-bold">
                    ECO
                  </span>
                </div>
              </div>

              {/* Card 3 - Quà tặng xanh */}
              <div className="group relative w-80 h-96 rounded-3xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 bg-white">
                <figure className="h-full w-full">
                  <img
                    src="/images/anh1.jpg"
                    alt="Quà tặng xanh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </figure>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-accent-warm rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-accent-warm uppercase tracking-wider">Gift Set</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">QUÀ TẶNG XANH</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Món quà ý nghĩa từ bã cà phê – lan tỏa lối sống bền vững đến mọi người.
                  </p>
                  <button className="bg-accent-warm hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Khám phá
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-sm text-accent-warm px-3 py-1 rounded-full text-xs font-bold">
                    GIFT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </section>


      <section className="px-8 py-16 bg-base-100">
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
      </section>

      {/* SẢN PHẨM BÁN CHẠY */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 mb-4">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="text-sm text-primary-600 uppercase tracking-[0.3em] mb-4 font-semibold">
              SUSTAINABLE COLLECTION
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-6">
              Sản Phẩm Bán Chạy
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Khám phá những sản phẩm được yêu thích nhất, được làm từ bã cà phê tái chế với chất lượng cao
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts?.map((product, index) => (
              <div
                key={product._id}
                className="group card h-full flex flex-col hover:shadow-large transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={product.thumbnail[0] || "/images/placeholder.jpg"}
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
                    <div className="text-2xl font-bold" style={{ color: "#20161F" }}>
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
                        <svg
                          className="w-4 h-4 transition-transform duration-300 hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                        Thêm vào giỏ
                      </span>
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>


          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              <span>Xem tất cả sản phẩm</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/header-background1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8 drop-shadow-2xl">
              Về Grounds2Dish
            </h1>

            <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full shadow-lg"></div>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed font-light">
                Với sứ mệnh lan tỏa giải pháp xanh trong tiêu dùng, AirX Coffee –
                Veritas Việt Nam đã thành công sản xuất ly tái chế từ bã cà phê,
                mang lại lựa chọn thay thế ly nhựa truyền thống.
              </p>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Sản phẩm được thiết kế không chỉ bền đẹp mà còn thân thiện môi trường,
                tận dụng tối đa nguồn phụ phẩm tự nhiên. Sau quá trình nghiên cứu dài hạn,
                AirX hiện diện tại hơn 50 quốc gia và tự hào đáp ứng đầy đủ các tiêu chuẩn
                chất lượng toàn cầu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 