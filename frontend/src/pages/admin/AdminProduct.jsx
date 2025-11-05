import { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, Plus, X } from "lucide-react";
import { apiAdminClient } from "../../constants/apiUrl";
import { compressImage } from "../../utils/imageCompression";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // { message, onConfirm }
    const [toast, setToast] = useState(null); // { message, type }
    const [filterCategory, setFilterCategory] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [filterPriceMin, setFilterPriceMin] = useState("");
    const [filterPriceMax, setFilterPriceMax] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    // Auto hide toast
    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [toast]);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/products/admin");
            // Xử lý response - đảm bảo luôn là array
            const productsData = Array.isArray(data) ? data : (data?.data || []);
            setProducts(productsData);
        } catch (error) {
            console.error("Lỗi khi fetch sản phẩm:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const data = await apiAdminClient("/product-categories");
            // Xử lý response - đảm bảo luôn là array
            const categoriesData = Array.isArray(data) ? data : (data?.data || []);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Lỗi khi fetch danh mục:", error);
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [filterCategory, searchTitle, filterPriceMin, filterPriceMax]);
    // Delete product
    const handleDelete = (id) => {
        setConfirmAction({
            message: "Bạn có chắc muốn xóa sản phẩm này?",
            onConfirm: async () => {
                try {
                    await apiAdminClient(`/products/${id}/delete`, { method: "PATCH" });
                    fetchProducts();
                    setToast({ message: "Xóa thành công!", type: "success" });
                } catch (error) {
                    console.error("Xóa thất bại:", error);
                    setToast({ message: "Xóa thất bại!", type: "error" });
                }
            },
        });
    };

    // Restore product
    const handleRestore = (id) => {
        setConfirmAction({
            message: "Bạn có chắc muốn khôi phục sản phẩm này?",
            onConfirm: async () => {
                try {
                    await apiAdminClient(`/products/${id}/restore`, { method: "PATCH" });
                    fetchProducts();
                    setToast({ message: "Khôi phục thành công!", type: "success" });
                } catch (error) {
                    console.error("Khôi phục thất bại:", error);
                    setToast({ message: "Khôi phục thất bại!", type: "error" });
                }
            },
        });
    };

    // Toggle status
    const handleToggleStatus = async (id, status) => {
        try {
            await apiAdminClient(`/products/${id}/toggle-status`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: status === "active" ? "inactive" : "active",
                }),
            });
            fetchProducts();
            setToast({ message: "Cập nhật trạng thái thành công!", type: "success" });
        } catch (error) {
            console.error("Lỗi toggle status:", error);
            setToast({ message: "Cập nhật trạng thái thất bại!", type: "error" });
        }
    };

    // Save Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", editingProduct.title);
            formData.append(
                "product_category_id",
                editingProduct.product_category_id._id || editingProduct.product_category_id
            );
            formData.append("price", editingProduct.price);
            formData.append("description", editingProduct.description);
            formData.append("status", editingProduct.status || "active");

            // Giữ lại ảnh cũ
            const oldThumbnails = (editingProduct.thumbnail || []).filter(
                (f) => typeof f === "string"
            );
            formData.append("oldThumbnails", JSON.stringify(oldThumbnails));
            formData.append("ingredients", JSON.stringify(editingProduct.ingredients || []));
            formData.append("usage", JSON.stringify(editingProduct.usage || []));

            // Nén và upload file mới
            const newFiles = (editingProduct.thumbnail || []).filter((f) => f instanceof File);
            for (const file of newFiles) {
                const compressed = await compressImage(file, { quality: 0.85 });
                formData.append("thumbnail", compressed);
            }

            await apiAdminClient(`/products/edit/${editingProduct._id}`, {
                method: "PATCH",
                body: formData,
            });

            setEditingProduct(null);
            fetchProducts();
            setToast({ message: "Cập nhật thành công!", type: "success" });
        } catch (error) {
            console.error("Update thất bại:", error);
            setToast({ message: "Cập nhật thất bại!", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Save Add
    const handleAdd = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", editingProduct.title);
            formData.append("product_category_id", editingProduct.product_category_id);
            formData.append("price", editingProduct.price);
            formData.append("ingredients", JSON.stringify(editingProduct.ingredients || []));
            formData.append("usage", JSON.stringify(editingProduct.usage || []));
            formData.append("description", editingProduct.description);
            formData.append("status", editingProduct.status || "active");

            // Nén ảnh trước khi upload
            if (editingProduct.thumbnail?.length) {
                for (const file of editingProduct.thumbnail) {
                    const compressed = await compressImage(file, { quality: 0.85 });
                    formData.append("thumbnail", compressed);
                }
            }
            await apiAdminClient(`/products/create`, {
                method: "POST",
                body: formData,
            });

            setShowAddForm(false);
            setEditingProduct(null);
            fetchProducts();
            setToast({ message: "Thêm sản phẩm thành công!", type: "success" });
        } catch (error) {
            console.error("Thêm thất bại:", error);
            setToast({ message: "Thêm sản phẩm thất bại!", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Confirm handler
    const handleConfirmAction = async () => {
        if (confirmAction?.onConfirm) {
            await confirmAction.onConfirm();
        }
        setConfirmAction(null);
    };
    const filteredProducts = Array.isArray(products) ? products.filter((p) => {
        // Filter by category
        const matchCategory = filterCategory ? (
            typeof p.product_category_id === "object"
                ? p.product_category_id._id === filterCategory
                : p.product_category_id === filterCategory
        ) : true;
        // Search by title
        const matchTitle = searchTitle
            ? p.title?.toLowerCase().includes(searchTitle.toLowerCase())
            : true;
        // Filter by price range
        const price = Number(p.price);
        const matchPriceMin = filterPriceMin ? price >= Number(filterPriceMin) : true;
        const matchPriceMax = filterPriceMax ? price <= Number(filterPriceMax) : true;
        return matchCategory && matchTitle && matchPriceMin && matchPriceMax;
    }) : [];
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Array.isArray(filteredProducts)
        ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
        : [];
    const totalPages = Array.isArray(filteredProducts)
        ? Math.ceil(filteredProducts.length / productsPerPage)
        : 0;

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
                            thumbnail: [],
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
            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">Tất cả danh mục</option>
                    {Array.isArray(categories) && categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="border rounded px-3 py-2"
                    placeholder="Tìm theo tên sản phẩm"
                />
                <input
                    type="number"
                    value={filterPriceMin}
                    onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value)); // không cho âm
                        setFilterPriceMin(value);
                    }}
                    className="border rounded px-3 py-2"
                    placeholder="Giá từ"
                    min={0}
                />

                <input
                    type="number"
                    value={filterPriceMax}
                    onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value)); // không cho âm
                        setFilterPriceMax(value);
                    }}
                    className="border rounded px-3 py-2"
                    placeholder="Giá đến"
                    min={0}
                />

                <button
                    className="px-4 py-2 rounded bg-gray-200"
                    onClick={() => {
                        setFilterCategory("");
                        setSearchTitle("");
                        setFilterPriceMin("");
                        setFilterPriceMax("");
                    }}
                >
                    Xóa lọc
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
                                <td colSpan={7} className="text-center py-6">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : currentProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6">
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            Array.isArray(currentProducts) && currentProducts.map((p) => (
                                <tr key={p._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">
                                        {p.thumbnail && p.thumbnail.length > 0 ? (
                                            <img
                                                src={p.thumbnail[0]}
                                                alt={p.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">No image</span>
                                        )}
                                    </td>
                                    <td className="p-3 border">{p.title}</td>
                                    <td className="p-3 border">
                                        {p.product_category_id
                                            ? p.product_category_id.title
                                            : "N/A"}
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
                            ))
                        )}
                    </tbody>
                </table>

            </div>

            {/* Confirm Modal */}
            {confirmAction && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg mb-4">{confirmAction.message}</h3>
                        <div className="flex justify-end gap-4">
                            <button
                                className="btn btn-outline"
                                onClick={() => setConfirmAction(null)}
                            >
                                Hủy
                            </button>
                            <button className="btn btn-error" onClick={handleConfirmAction}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <nav className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 rounded border"
                        >
                            Trước
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-1 rounded border ${currentPage === number ? "bg-blue-600 text-white" : ""}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 rounded border"
                        >
                            Sau
                        </button>
                    </nav>
                </div>
            )}
            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50">
                    <div
                        className={`alert shadow-lg ${toast.type === "success" ? "alert-success" : "alert-error"
                            }`}
                    >
                        <span>{toast.message}</span>
                        <button
                            className="btn btn-sm btn-ghost ml-2"
                            onClick={() => setToast(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Form Modal Add/Edit */}
            {(editingProduct && (showAddForm || editingProduct._id)) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
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
                                    setEditingProduct({ ...editingProduct, title: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên sản phẩm"
                                required
                            />

                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, price: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Giá"
                                required
                            />

                            <select
                                value={
                                    typeof editingProduct.product_category_id === "object"
                                        ? editingProduct.product_category_id._id
                                        : editingProduct.product_category_id
                                }
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
                                {Array.isArray(categories) && categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                            {/* Thành phần (ingredients) */}
                            <div>
                                <label className="font-medium">Thành phần (Ingredients)</label>
                                {(editingProduct.ingredients || []).map((item, index) => (
                                    <div key={index} className="flex gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const updated = [...editingProduct.ingredients];
                                                updated[index] = e.target.value;
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    ingredients: updated,
                                                });
                                            }}
                                            className="flex-1 border rounded px-3 py-2"
                                            placeholder={`Thành phần ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = editingProduct.ingredients.filter(
                                                    (_, i) => i !== index
                                                );
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    ingredients: updated,
                                                });
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            ingredients: [
                                                ...(editingProduct.ingredients || []),
                                                "",
                                            ],
                                        })
                                    }
                                    className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded"
                                >
                                    + Thêm thành phần
                                </button>
                            </div>
                            {/* Hướng dẫn sử dụng (usage) */}
                            <div>
                                <label className="font-medium">Hướng dẫn sử dụng (Usage)</label>
                                {(editingProduct.usage || []).map((step, index) => (
                                    <div key={index} className="flex gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={step}
                                            onChange={(e) => {
                                                const updated = [...editingProduct.usage];
                                                updated[index] = e.target.value;
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    usage: updated,
                                                });
                                            }}
                                            className="flex-1 border rounded px-3 py-2"
                                            placeholder={`Bước ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = editingProduct.usage.filter(
                                                    (_, i) => i !== index
                                                );
                                                setEditingProduct({
                                                    ...editingProduct,
                                                    usage: updated,
                                                });
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            usage: [...(editingProduct.usage || []), ""],
                                        })
                                    }
                                    className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded"
                                >
                                    + Thêm bước sử dụng
                                </button>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                    const newFiles = Array.from(e.target.files);
                                    const combined = [
                                        ...(Array.isArray(editingProduct.thumbnail)
                                            ? editingProduct.thumbnail
                                            : []),
                                        ...newFiles,
                                    ].slice(0, 3);
                                    setEditingProduct({ ...editingProduct, thumbnail: combined });
                                }}
                                className="w-full border rounded px-3 py-2"
                            />

                            <div className="flex gap-2 mt-2">
                                {(editingProduct?.thumbnail || []).map((file, index) => {
                                    let src = "";
                                    if (typeof file === "string") src = file;
                                    else if (file instanceof File) src = URL.createObjectURL(file);
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
                                                    const copy = [...editingProduct.thumbnail];
                                                    copy.splice(index, 1);
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        thumbnail: copy,
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
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Đang xử lý..." : (showAddForm ? "Thêm mới" : "Lưu thay đổi")}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
