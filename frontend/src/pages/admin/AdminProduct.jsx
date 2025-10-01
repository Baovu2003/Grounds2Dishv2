import { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, Plus, X } from "lucide-react";
import { apiAdminClient } from "../../constants/apiUrl";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/products");
            setProducts(data);
        } catch (error) {
            console.error("Lỗi khi fetch sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/product-categories");
            setCategories(data);
        } catch (error) {
            console.error("Lỗi khi fetch danh mục:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        try {
            await apiAdminClient(`/products/${id}/delete`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deleted: true }),
            });
            fetchProducts();
        } catch (error) {
            console.error("Xóa thất bại:", error);
        }
    };
    const handleRestore = async (id) => {
        if (!window.confirm("Bạn có chắc muốn khôi phục sản phẩm này?")) return;
        try {
            await apiAdminClient(`/products/${id}/restore`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deleted: false }),
            });
            fetchProducts();
        } catch (error) {
            console.error("Khôi phục thất bại:", error);
        }
    };

    // Toggle status
    const handleToggleStatus = async (id, status) => {
        try {
            await apiAdminClient(`/products/${id}/toggle-status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: status === "active" ? "inactive" : "active",
                }),
            });
            fetchProducts();
        } catch (error) {
            console.error("Lỗi toggle status:", error);
        }
    };

    // Save Edit
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", editingProduct.title);
            formData.append(
                "product_category_id",
                editingProduct.product_category_id._id || editingProduct.product_category_id
            );
            formData.append("price", editingProduct.price);
            formData.append("description", editingProduct.description);
            formData.append("status", editingProduct.status || "active");

            // Chỉ lấy ảnh cũ còn lại trong mảng (người dùng chưa xóa)
            const oldThumbnails = (editingProduct.thumbnail || []).filter(f => typeof f === "string");
            formData.append("oldThumbnails", JSON.stringify(oldThumbnails));

            // Append file mới
            (editingProduct.thumbnail || [])
                .filter(f => f instanceof File)
                .forEach(file => formData.append("thumbnail", file));

            const res = await apiAdminClient(`/products/edit/${editingProduct._id}`, {
                method: "PATCH",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Update thất bại:", error);
        }
    };


    // Save Add
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", editingProduct.title);
            formData.append("product_category_id", editingProduct.product_category_id);
            formData.append("price", editingProduct.price);
            formData.append("description", editingProduct.description);
            formData.append("status", editingProduct.status || "active");

            // Nếu thumbnail là mảng nhiều ảnh
            if (editingProduct.thumbnail?.length) {
                editingProduct.thumbnail.forEach((file) => {
                    formData.append("thumbnail", file);
                });
            }
            await apiAdminClient(`/products/create`, {
                method: "POST",
                body: formData,
            });

            setShowAddForm(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Thêm thất bại:", error);
        }
    };
    console.log("products", products)

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                <button
                    onClick={() => {
                        setEditingProduct({
                            title: "",
                            product_category_id: "",
                            price: "",
                            thumbnail: "",
                            description: "",
                            status: "active",
                        });
                        setShowAddForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    <Plus className="w-5 h-5" /> Thêm sản phẩm
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow mb-6">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="p-3 border">Ảnh</th>
                            <th className="p-3 border">Tên</th>
                            <th className="p-3 border">Danh mục</th>
                            <th className="p-3 border">Giá</th>
                            <th className="p-3 border">Đã xóa</th>
                            <th className="p-3 border">Trạng thái</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6">
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => {

                                return (
                                    <tr key={p._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 border">
                                            {p.thumbnail && p.thumbnail.length > 0 ? (
                                                <img
                                                    src={p.thumbnail[0]} // lấy ảnh đầu tiên
                                                    alt={p.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">No image</span>
                                            )}
                                        </td>
                                        <td className="p-3 border">{p.title}</td>
                                        <td className="p-3 border">
                                            {p.product_category_id ? p.product_category_id.title : "N/A"}
                                        </td>

                                        <td className="p-3 border">
                                            {p.price?.toLocaleString()} đ
                                        </td>
                                        <td className="p-3 border">
                                            <span
                                                className={`px-3 py-1 rounded text-xs font-medium ${p.deleted
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {p.deleted ? "Deleted" : "UnDeleted"}
                                            </span>
                                        </td>

                                        <td className="p-3 border">
                                            <span
                                                className={`px-3 py-1 rounded text-xs font-medium ${p.status === "inactive"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {p.status === "active" ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-3 border text-center space-x-2">
                                            <button
                                                onClick={() => setEditingProduct(p)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {!p.deleted ? (
                                                <button
                                                    onClick={() => handleDelete(p._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRestore(p._id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                                                >
                                                    ♻ Khôi phục
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleToggleStatus(p._id, p.status)}
                                                className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                                            >
                                                {p.status === "active" ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form (Add + Edit) */}
            {(editingProduct && (showAddForm || editingProduct._id)) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                {showAddForm ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
                            </h2>
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setShowAddForm(false);
                                }}
                                className="p-2 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={showAddForm ? handleAdd : handleUpdate}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={editingProduct.title}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên sản phẩm"
                                required
                            />

                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        price: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Giá"
                                required
                            />

                            {/* Category select */}
                            <select
                                value={editingProduct.product_category_id._id}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        product_category_id: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                required
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>



                            {/* File input cho nhiều ảnh */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    const newFiles = Array.from(e.target.files);
                                    // gộp với file cũ (nếu có)
                                    const combinedFiles = [
                                        ...(Array.isArray(editingProduct.thumbnail) ? editingProduct.thumbnail : []),
                                        ...newFiles
                                    ].slice(0, 3); // tối đa 3 file
                                    setEditingProduct({
                                        ...editingProduct,
                                        thumbnail: combinedFiles,
                                    });
                                }}
                                className="w-full border rounded px-3 py-2"
                            />

                            <div className="flex gap-2 mt-2">
                                {(editingProduct?.thumbnail
                                    ? Array.isArray(editingProduct.thumbnail)
                                        ? editingProduct.thumbnail
                                        : typeof editingProduct.thumbnail === "string"
                                            ? [editingProduct.thumbnail]
                                            : []
                                    : []
                                ).map((file, index) => {
                                    let src = "";
                                    if (typeof file === "string") src = file; // URL cũ
                                    else if (file instanceof File) src = URL.createObjectURL(file); // File mới
                                    return (
                                        <div key={index} className="relative">
                                            <img
                                                src={src}
                                                alt={`preview-${index}`}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newThumbnails = [...editingProduct.thumbnail];
                                                    newThumbnails.splice(index, 1); // xóa ảnh được click
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        thumbnail: newThumbnails,
                                                    });
                                                }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <textarea
                                value={editingProduct.description}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Mô tả"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                            >
                                {showAddForm ? "Thêm mới" : "Lưu thay đổi"}
                            </button>
                        </form>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default AdminProduct;
