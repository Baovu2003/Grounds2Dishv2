import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useCartStore from "../store/useCartStore";

const sampleCategories = [
  { CategoryId: 1, CategoryName: "Bát & Ly Tái Chế" },
  { CategoryId: 2, CategoryName: "Đĩa & Thìa Eco" },
  { CategoryId: 6, CategoryName: "Phụ Kiện Nhà Bếp" },
  { CategoryId: 7, CategoryName: "Sản Phẩm Văn Phòng" },
  { CategoryId: 8, CategoryName: "Đồ Chơi & Quà Tặng" },
];

const sampleProducts = [
  {
    id: 1,
    name: "Bát Tái Chế Từ Bã Cà Phê",
    categoryId: 1,
    price: 150000,
    thumbnail: "https://source.unsplash.com/400x300/?bowl,coffee,recycled",
    label: "Sản phẩm bền vững",
    description:
      "Bát ăn được làm từ bã cà phê tái chế, thân thiện với môi trường",
  },
  {
    id: 2,
    name: "Đĩa Eco Coffee",
    categoryId: 2,
    price: 180000,
    thumbnail: "https://source.unsplash.com/400x300/?plate,coffee,eco",
    label: "Sản phẩm bền vững",
    description: "Đĩa ăn từ bã cà phê, chống nước và bền đẹp",
  },
  {
    id: 3,
    name: "Ly Cà Phê Tái Chế",
    categoryId: 1,
    price: 90000,
    thumbnail: "https://source.unsplash.com/400x300/?coffee-cup,recycled,eco",
    label: "Sản phẩm bền vững",
    description: "Ly uống nước từ bã cà phê, giữ nhiệt tốt",
  },
  {
    id: 4,
    name: "Chậu Cây Coffee Grounds",
    categoryId: 4,
    price: 120000,
    thumbnail: "https://source.unsplash.com/400x300/?plant-pot,coffee,recycled",
    label: "Chậu cây thông minh",
    description: "Chậu cây từ bã cà phê, giữ ẩm tự nhiên",
  },
  {
    id: 5,
    name: "Bộ Thìa Muỗng Eco",
    categoryId: 3,
    price: 200000,
    thumbnail: "https://source.unsplash.com/400x300/?spoon,coffee,eco",
    label: "Bộ dụng cụ bền vững",
    description: "Bộ thìa muỗng từ bã cà phê, không độc hại",
  },
  {
    id: 6,
    name: "Đèn Trang Trí Coffee",
    categoryId: 5,
    price: 250000,
    thumbnail: "https://source.unsplash.com/400x300/?lamp,coffee,decorative",
    label: "Đồ trang trí độc đáo",
    description: "Đèn trang trí từ bã cà phê, ánh sáng ấm áp",
  },
  {
    id: 7,
    name: "Khay Đựng Đồ Văn Phòng",
    categoryId: 7,
    price: 300000,
    thumbnail: "https://source.unsplash.com/400x300/?tray,office,coffee",
    label: "Sản phẩm văn phòng",
    description: "Khay đựng đồ từ bã cà phê, thiết kế hiện đại",
  },
];

export default function Shop() {
  const { addItem } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([50000, 400000]);
  const [inputMin, setInputMin] = useState(priceRange[0]);
  const [inputMax, setInputMax] = useState(priceRange[1]);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description
    });
  };

  useEffect(() => {
    let filtered = sampleProducts;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, priceRange, search]);

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
    <div className="min-h-screen bg-base-100">
      <div className=" text-black">
        <div className="container mx-auto px-4 py-8">
          <div className="breadcrumbs text-sm mb-4">
            <ul>
              <li>
                <a className="link link-hover text-black">Home</a>
              </li>
              <li className="text-black">Shop</li>
            </ul>
          </div>
          <h1 className="text-4xl font-bold mb-2">Shop Grounds2Dish</h1>
          <p className="text-lg opacity-90">
            Biến bã cà phê thành giá trị mới! Khám phá các sản phẩm bền vững từ
            bã cà phê tái chế
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 space-y-6">
            {/* Category Filter */}
            <div className="card shadow-lg border-2">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Danh Mục Sản Phẩm</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`btn btn-sm w-full justify-start ${!selectedCategory ? "bg-green-600 text-white" : "bg-white text-black-900 hover:bg-green-100"
                        }`}
                    >
                      Tất cả sản phẩm
                    </button>
                  </li>

                  {sampleCategories.map((c) => (
                    <li key={c.CategoryId}>
                      <button
                        onClick={() => setSelectedCategory(c.CategoryId)}
                        className={`btn btn-sm w-full justify-start ${selectedCategory === c.CategoryId ? "bg-green-600 text-white" : "bg-white text-black-900 hover:bg-green-100"
                          }`}
                      >
                        {c.CategoryName}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card  shadow-lg border-2">
              <div className="card-body">
                <h3 className="card-title text-lg">Giá (₫)</h3>

                <div className="relative w-full h-12 mb-4">
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-lg transform -translate-y-1/2"></div>

                  <div
                    className="absolute top-1/2 h-2 bg-green-500 rounded-lg transform -translate-y-1/2"
                    style={{
                      left: `${((priceRange[0] - 10000) / (400000 - 10000)) * 100
                        }%`,
                      width: `${((priceRange[1] - priceRange[0]) / (400000 - 10000)) *
                        100
                        }%`,
                    }}
                  ></div>

                  <input
                    type="range"
                    min="10000"
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
                    min="10000"
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
                    background: #16a34a;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    position: relative;
                    z-index: 30;
                  }

                  input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #16a34a;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

                {/* Input số */}
                <div className="flex justify-between space-x-2">
                  <div className="flex-1">
                    <label className="label">
                      <span className="label-text text-xs">Từ</span>
                    </label>
                    <input
                      type="number"
                      value={inputMin}
                      onChange={(e) => setInputMin(Number(e.target.value))}
                      onBlur={() => {
                        let newMin = Math.max(
                          10000,
                          Math.min(inputMin, priceRange[1])
                        );
                        setPriceRange([newMin, priceRange[1]]);
                        setInputMin(newMin);
                      }}
                      className="input input-bordered w-full input-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="label">
                      <span className="label-text text-xs">Đến</span>
                    </label>
                    <input
                      type="number"
                      value={inputMax}
                      onChange={(e) => setInputMax(Number(e.target.value))}
                      onBlur={() => {
                        let newMax = Math.min(
                          400000,
                          Math.max(inputMax, priceRange[0])
                        );
                        setPriceRange([priceRange[0], newMax]);
                        setInputMax(newMax);
                      }}
                      className="input input-bordered w-full input-sm "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-white shadow-lg border-2">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Tìm kiếm</h3>
                <div className="form-control">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tên sản phẩm..."
                    className="input input-bordered w-full  focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div id="productCount" className="mb-4 text-gray-500">
              Hiển thị {currentProducts.length} trong tổng số{" "}
              {filteredProducts.length} sản phẩm
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-2xl font-bold mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-base-content/60">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để khám phá các sản
                  phẩm từ bã cà phê
                </p>
              </div>
            ) : (
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  id="productList"
                >
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <figure className="relative overflow-hidden">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title text-lg text-green-800 font-bold">{product.name}</h2>
                        <p className="text-base-content/60 text-sm">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-2xl font-bold  text-green-800">
                            {formatPrice(product.price)}
                          </div>
                          <div className="card-actions">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="btn btn-primary btn-sm"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                                />
                              </svg>
                              Thêm vào giỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <ul
                    className="pagination flex justify-center mt-8"
                    id="pagination"
                  >
                    <li>
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline disabled:btn-disabled"
                      >
                        «
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <li key={number}>
                          <button
                            onClick={() => paginate(number)}
                            className={`btn btn-sm ${currentPage === number
                              ? "btn-primary"
                              : "btn-outline"
                              }`}
                          >
                            {number}
                          </button>
                        </li>
                      )
                    )}

                    <li>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline disabled:btn-disabled"
                      >
                        »
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
