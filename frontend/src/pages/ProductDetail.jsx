import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useCartStore from "../store/useCartStore";
import { apiClient } from "../constants/apiUrl";

const PRODUCT_API = "http://localhost:5000/api/products";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiClient(`/products/${id}`)
                if (!data) throw new Error(data.error || "Lỗi khi lấy sản phẩm");

                setProduct(data);
                setMainImage(data.thumbnail?.[0] || "");
            } catch (err) {
                console.error(err);
                setProduct(null);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="section-padding">
                <div className="container-custom text-center space-y-6">
                    <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
                    <Link to="/shop" className="btn-secondary inline-block">
                        Quay lại Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(
            {
                _id: product._id,
                name: product.title,
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
                {/* Gallery */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {product.thumbnail?.length > 1 && (
                        <div className="flex gap-3 p-4 overflow-x-auto">
                            {product.thumbnail.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? "border-blue-500" : "border-gray-200"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt="thumb"
                                        className="h-full w-full object-cover hover:scale-110 transition-transform"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900">
                            {product.title}
                        </h1>
                        <p className="text-neutral-600 mt-3">{product.description}</p>
                    </div>

                    <div className="text-3xl font-bold text-primary">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(product.price)}
                    </div>

                    {/* Quantity + Buttons */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 border rounded-xl">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-2 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                                }
                                className="w-16 text-center outline-none"
                            />
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-2"
                            >
                                +
                            </button>
                        </div>

                        <button onClick={handleAddToCart} className="btn-primary">
                            Thêm vào giỏ
                        </button>
                        <Link to="/shop" className="btn-secondary">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
