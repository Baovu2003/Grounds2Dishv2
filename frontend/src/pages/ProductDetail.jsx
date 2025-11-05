import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useCartStore from "../store/useCartStore";
import { apiClient } from "../constants/apiUrl";

export default function ProductDetail() {
    const { id } = useParams();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState("");
    const [activeTab, setActiveTab] = useState("description"); // tab: description | ingredients | usage

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiClient(`/products/${id}`);
                if (!data) throw new Error("Lỗi khi lấy sản phẩm");
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
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                description: product.description,
                product_category_id: product.product_category_id,
            },
            quantity
        );
    };

    return (
        <div className="section-padding">
            <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Hình ảnh sản phẩm */}
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

                    {/* Số lượng + nút thêm giỏ */}
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
                    <div className="container-custom mt-12">
                        <div className="flex border-b border-gray-200">
                            {[
                                { id: "description", label: "Mô tả sản phẩm" },
                                { id: "ingredients", label: "Thành phần" },
                                { id: "usage", label: "Cách sử dụng" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-3 px-6 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "text-gray-500 hover:text-gray-800"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-b-2xl shadow mt-2">
                            {activeTab === "description" && (
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description || "Chưa có mô tả cho sản phẩm này."}
                                </p>
                            )}
                            {activeTab === "ingredients" && (
                                <ul className="list-disc ml-5 text-gray-700 space-y-2">
                                    {product.ingredients?.length ? (
                                        product.ingredients.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))
                                    ) : (
                                        <p>Chưa có thông tin thành phần.</p>
                                    )}
                                </ul>
                            )}
                            {activeTab === "usage" && (
                                <ul className=" ml-5 text-gray-700 space-y-2">
                                    {product.usage?.length ? (
                                        product.usage.map((step, idx) => <li key={idx}>{step}</li>)
                                    ) : (
                                        <p>Chưa có hướng dẫn sử dụng.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
