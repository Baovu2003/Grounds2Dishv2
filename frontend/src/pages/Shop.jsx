import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useCartStore from "../store/useCartStore";
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { apiClient } from "../constants/apiUrl";

export default function Shop() {
  const { addItem } = useCartStore();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 400000]);
  const [inputMin, setInputMin] = useState(priceRange[0]);
  const [inputMax, setInputMax] = useState(priceRange[1]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('default'); // default, price-low, price-high, name

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          apiClient("/product-categories"),
          apiClient("/products"),
        ]);

        console.log("categories", catRes);
        console.log("products", prodRes);
        setCategories(catRes);
        setProducts(prodRes);
        setFilteredProducts(prodRes);
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
      }
    };

    fetchData();
  }, []);
  console.log("categories", categories)
  console.log("products", products)
  const handleAddToCart = (product) => {
    addItem({
      _id: product._id,
      name: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description
    });


  };

  useEffect(() => {
    let filtered = products;
    console.log("filtered", filtered)
    console.log("products", products)

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.product_category_id._id === selectedCategory);
    }

    console.log("selectedCategory", selectedCategory)

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting logic
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, search, sortBy, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8f7f8 0%, #f0eef0 100%)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 50%, #3a2a3a 100%)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40"></div>
        </div>

        <div className="relative z-10 container-custom py-16 lg:py-24">
          <div className="text-center text-white space-y-6">
            <div className="inline-flex items-center gap-2 mb-4" style={{ color: '#a8a0a8' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#b8b0b8' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#a8a0a8', animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#989098', animationDelay: '0.4s' }}></div>
            </div>

            <div className="text-sm uppercase tracking-[0.3em] mb-4 font-semibold" style={{ color: '#a8a0a8' }}>
              SUSTAINABLE COLLECTION
            </div>

            <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 drop-shadow-2xl">
              Grounds2Dish
            </h1>

            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#b8b0b8' }}>
              Biến bã cà phê thành giá trị mới! Khám phá các sản phẩm bền vững từ bã cà phê tái chế
            </p>

            {/* Breadcrumbs */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2" style={{ color: '#a8a0a8' }}>
                <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-semibold">Shop</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80 space-y-8 sticky top-32 h-fit">
              {/* Category Filter */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Filter className="w-5 h-5" style={{ color: '#20161F' }} />
                    <h3 className="text-xl font-display font-bold text-neutral-800">Danh Mục Sản Phẩm</h3>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${!selectedCategory
                        ? "text-white shadow-lg"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      style={!selectedCategory ? { backgroundColor: '#20161F' } : {}}
                    >
                      Tất cả sản phẩm
                    </button>

                    {categories?.map((c) => (
                      <button
                        key={c._id}
                        onClick={() => setSelectedCategory(c._id)}
                        className={`w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${selectedCategory === c._id
                          ? "text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        style={selectedCategory === c._id ? { backgroundColor: '#20161F' } : {}}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-display font-bold text-neutral-800 mb-6">Khoảng Giá (₫)</h3>

                  <div className="relative w-full h-12 mb-6">
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-neutral-200 rounded-lg transform -translate-y-1/2"></div>

                    <div
                      className="absolute top-1/2 h-2 rounded-lg transform -translate-y-1/2"
                      style={{
                        backgroundColor: '#20161F',
                        left: `${(priceRange[0] / 400000) * 100}%`,
                        width: `${((priceRange[1] - priceRange[0]) / 400000) * 100}%`,
                      }}
                    ></div>

                    <input
                      type="range"
                      min="0"
                      max="400000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = Number(e.target.value);
                        if (newMin <= priceRange[1]) {
                          setPriceRange([newMin, priceRange[1]]);
                          setInputMin(newMin);
                        }
                      }}
                      className="absolute top-1/3 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-10"
                      style={{
                        background: "transparent",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />

                    <input
                      type="range"
                      min="0"
                      max="400000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = Number(e.target.value);
                        if (newMax >= priceRange[0]) {
                          setPriceRange([priceRange[0], newMax]);
                          setInputMax(newMax);
                        }
                      }}
                      className="absolute top-1/3 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer transform -translate-y-1/2 z-20"
                      style={{
                        background: "transparent",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />
                  </div>

                  <style jsx>{`
                    input[type="range"]::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #20161F;
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                      position: relative;
                      z-index: 30;
                    }

                    input[type="range"]::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #20161F;
                      cursor: pointer;
                      border: 3px solid white;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                      position: relative;
                      z-index: 30;
                    }

                    input[type="range"]::-webkit-slider-track {
                      background: transparent;
                      height: 2px;
                    }

                    input[type="range"]::-moz-range-track {
                      background: transparent;
                      height: 2px;
                      border: none;
                    }

                    input[type="range"]::-webkit-slider-runnable-track {
                      background: transparent;
                      height: 2px;
                    }
                  `}</style>

                  {/* Price Inputs */}
                  <div className="flex justify-between space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-neutral-600 mb-2">Từ</label>
                      <input
                        type="number"
                        value={inputMin}
                        onChange={(e) => setInputMin(Number(e.target.value))}
                        onBlur={() => {
                          let newMin = Math.max(0, Math.min(inputMin, priceRange[1]));
                          setPriceRange([newMin, priceRange[1]]);
                          setInputMin(newMin);
                        }}
                        className="input-field w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-neutral-600 mb-2">Đến</label>
                      <input
                        type="number"
                        value={inputMax}
                        onChange={(e) => setInputMax(Number(e.target.value))}
                        onBlur={() => {
                          let newMax = Math.min(400000, Math.max(inputMax, priceRange[0]));
                          setPriceRange([priceRange[0], newMax]);
                          setInputMax(newMax);
                        }}
                        className="input-field w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Filter */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="w-5 h-5" style={{ color: '#20161F' }} />
                    <h3 className="text-xl font-display font-bold text-neutral-800">Tìm Kiếm</h3>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Tìm kiếm sản phẩm..."
                      className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-300 transition-all duration-300 text-lg placeholder-gray-400"
                      aria-label="Tìm kiếm sản phẩm"
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className="text-neutral-600">
                    Hiển thị <span className="font-semibold" style={{ color: '#20161F' }}>{currentProducts.length}</span> trong tổng số{" "}
                    <span className="font-semibold" style={{ color: '#20161F' }}>{filteredProducts.length}</span> sản phẩm
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-600">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-neutral-300 rounded-lg text-sm transition-all duration-300 bg-white"
                      style={{
                        '--tw-ring-color': 'rgba(51, 41, 51, 0.2)',
                        '--tw-border-opacity': '1'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#20161F';
                        e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                      aria-label="Sắp xếp sản phẩm"
                    >
                      <option value="default">Mặc định</option>
                      <option value="price-low">Giá thấp đến cao</option>
                      <option value="price-high">Giá cao đến thấp</option>
                      <option value="name">Tên A-Z</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'grid'
                        ? 'bg-white shadow-sm'
                        : 'text-neutral-600'
                        }`}
                      style={viewMode === 'grid' ? { color: '#20161F' } : {}}
                      onMouseEnter={(e) => {
                        if (viewMode !== 'grid') {
                          e.target.style.color = '#20161F';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (viewMode !== 'grid') {
                          e.target.style.color = '#6b7280';
                        }
                      }}
                      aria-label="Xem dạng lưới"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'list'
                        ? 'bg-white shadow-sm'
                        : 'text-neutral-600'
                        }`}
                      style={viewMode === 'list' ? { color: '#20161F' } : {}}
                      onMouseEnter={(e) => {
                        if (viewMode !== 'list') {
                          e.target.style.color = '#20161F';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (viewMode !== 'list') {
                          e.target.style.color = '#6b7280';
                        }
                      }}
                      aria-label="Xem dạng danh sách"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                  <div className="relative mb-8">
                    <div className="text-9xl mb-4 animate-float opacity-20">☕</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Search className="w-12 h-12 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-4xl font-display font-bold text-gray-800 mb-6">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để khám phá các sản phẩm từ bã cà phê
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory(null);
                      setPriceRange([0, 400000]);
                    }}
                    className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
                    style={{ backgroundColor: '#20161F' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2d1f2d'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#20161F'}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <>
                  <div className={`${viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                    }`}>
                    {currentProducts.map((product, index) => (
                      <div
                        key={product._id}
                        className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl hover-lift animate-fade-in overflow-hidden border border-gray-100 ${viewMode === 'list' ? 'flex flex-row h-72' : 'flex flex-col h-full'
                          }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Image Section */}
                        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-72 h-full' : 'h-56'
                          }`}>
                          {/* Product Image */}
                          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <img
                              src={product.thumbnail[0] || "/placeholder.svg"}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          {/* Wishlist Button */}
                          <div className="absolute top-3 right-3">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300 group/wishlist">
                              <Heart className="w-4 h-4 text-gray-500 group-hover/wishlist:text-red-500 transition-colors duration-300" />
                            </button>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'flex-1 p-6' : 'p-5 flex-1'
                          }`}>
                          {/* Product Info */}
                          <div className="space-y-3">

                            <Link
                              to={`/productdetail/${product._id}`}
                              className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                              {product.title}
                            </Link>
                            <p
                              className="text-gray-600 text-sm leading-relaxed line-clamp-2 cursor-help"
                              title={product.description}
                            >
                              {product.description}
                            </p>
                          </div>

                          {/* Price and Action */}
                          <div className="mt-4 space-y-3">
                            {/* Price */}
                            <div className="flex items-center justify-center">
                              <div className="text-2xl font-bold" style={{ color: '#20161F' }}>
                                {formatPrice(product.price)}
                              </div>
                            </div>

                            {/* Add to Cart Button - Only visible on hover */}
                            <div className=" transition-opacity duration-300">
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-white"
                                style={{
                                  background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                                  boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.background = 'linear-gradient(135deg, #2d1f2d 0%, #3a2a3a 100%)';
                                  e.target.style.boxShadow = '0 6px 20px 0 rgba(32, 22, 31, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background = 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)';
                                  e.target.style.boxShadow = '0 4px 14px 0 rgba(32, 22, 31, 0.2)';
                                }}
                                aria-label={`Thêm ${product.title} vào giỏ hàng`}
                              >
                                <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                Thêm vào giỏ
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                      <nav className="flex items-center gap-2">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-3 rounded-xl border border-neutral-300 text-neutral-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-600 disabled:hover:border-neutral-300"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === number
                              ? "text-white shadow-medium"
                              : "border border-neutral-300 text-neutral-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300"
                              }`}
                            style={currentPage === number ? { backgroundColor: '#20161F' } : {}}
                          >
                            {number}
                          </button>
                        ))}

                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-3 rounded-xl border border-neutral-300 text-neutral-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-600 disabled:hover:border-neutral-300"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
