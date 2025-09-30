import React, { useState } from "react";
import { useParams, Link } from "react-router";
import useCartStore from "../store/useCartStore";

// Fallback sample data; replace with API call when backend is ready
const sampleProducts = [
  {
    id: 1,
    name: "Bát Tái Chế Từ Bã Cà Phê",
    price: 150000,
    thumbnail: "/images/anh1.jpg",
    description:
      "Bát ăn được làm từ bã cà phê tái chế, thân thiện với môi trường",
    images: ["/images/anh1.jpg", "/images/anh2.jpg", "/images/anh3.jpg"],
  },
  {
    id: 2,
    name: "Đĩa Eco Coffee",
    price: 180000,
    thumbnail: "/images/anh2.jpg",
    description: "Đĩa ăn từ bã cà phê, chống nước và bền đẹp",
    images: ["/images/anh2.jpg", "/images/anh1.jpg", "/images/anh3.jpg"],
  },
  {
    id: 3,
    name: "Ly Cà Phê Tái Chế",
    price: 90000,
    thumbnail: "/images/logo1.jpg",
    description: "Ly uống nước từ bã cà phê, giữ nhiệt tốt",
    images: ["/images/logo1.jpg", "/images/anh1.jpg", "/images/anh2.jpg"],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const productId = Number(id);
  const product = sampleProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center space-y-6">
          <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <Link to="/shop" className="btn-secondary inline-block">Quay lại Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        description: product.description,
      },
      quantity
    );
  };

  return (
    <div className="section-padding">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-3 gap-3 p-4">
              {product.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt="thumb" className="h-24 w-full object-cover rounded-xl" />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900">{product.name}</h1>
            <p className="text-neutral-600 mt-3">{product.description}</p>
          </div>

          <div className="text-3xl font-bold" style={{ color: '#20161F' }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 rounded-xl border border-neutral-300"
                aria-label="Giảm số lượng"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-16 text-center border border-neutral-300 rounded-xl py-2"
                aria-label="Số lượng"
              />
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 rounded-xl border border-neutral-300"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
            >
              Thêm vào giỏ
            </button>
            <Link to="/shop" className="btn-secondary">Tiếp tục mua sắm</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


