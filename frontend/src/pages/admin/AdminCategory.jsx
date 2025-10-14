import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { apiAdminClient } from "../../constants/apiUrl";


const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState(null); // { message: string, type: 'success'|'error' }

    // ...existing code...
    const [searchTitle, setSearchTitle] = useState("");

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/product-categories/admin");
            setCategories(data);
        } catch (error) {
            console.error("Lỗi khi fetch danh mục:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle Add
    const handleAdd = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", editingCategory.title);
            formData.append("description", editingCategory.description || "");
            if (editingCategory.thumbnail instanceof File) {
                formData.append("thumbnail", editingCategory.thumbnail);
            }

            await apiAdminClient("/product-categories/create", {
                method: "POST",
                body: formData,
            });

            setShowAddForm(false);
            setEditingCategory(null);
            fetchCategories();
            setToast({ message: "Thêm danh mục thành công!", type: "success" });
        } catch (error) {
            console.error("Thêm thất bại:", error);
            setToast({ message: "Thêm danh mục thất bại!", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", editingCategory.title);
            formData.append("description", editingCategory.description || "");
            if (editingCategory.thumbnail instanceof File) {
                formData.append("thumbnail", editingCategory.thumbnail);
            }

            await apiAdminClient(`/product-categories/edit/${editingCategory._id}`, {
                method: "PATCH",
                body: formData,
            });

            setEditingCategory(null);
            fetchCategories();
            setToast({ message: "Cập nhật danh mục thành công!", type: "success" });
        } catch (error) {
            console.error("Update thất bại:", error);
            setToast({ message: "Cập nhật danh mục thất bại!", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Confirm Delete/Restore
    const handleConfirmAction = async () => {
        if (!confirmAction) return;
        const { type, id } = confirmAction;
        try {
            await apiAdminClient(
                `/product-categories/${type === "delete" ? "delete" : "restore"}/${id}`,
                {
                    method: "PATCH",
                }
            );
            fetchCategories();
            setToast({
                message: type === "delete" ? "Xóa danh mục thành công !" : "Khôi phục danh mục thành công!",
                type: "success",
            });
        } catch {
            setToast({
                message: type === "delete" ? "Xóa danh mục thất bại ! " : "Khôi phục danh mục thất bại!",
                type: "error",
            });
        } finally {
            setConfirmAction(null);
        }
    };

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);
    const filteredCategories = categories.filter((c) =>
        c.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchTitle}
                        onChange={e => {
                            setSearchTitle(e.target.value);
                        }}
                        className="border rounded px-3 py-2"
                        placeholder="Tìm kiếm theo tên"
                    />
                    <button
                        onClick={() => {
                            setEditingCategory({ title: "" });
                            setShowAddForm(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        <Plus className="w-5 h-5" /> Thêm danh mục
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow mb-6">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="p-3 border">Tên danh mục</th>
                            <th className="p-3 border">Mô tả danh mục</th>
                            <th className="p-3 border">Ảnh</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6">Đang tải...</td>
                            </tr>
                        ) : filteredCategories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6">Không có danh mục nào</td>
                            </tr>
                        ) : (
                            filteredCategories.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">{c.title}</td>
                                    <td className="p-3 border">{c.description}</td>
                                    <td className="p-3 border">
                                        <div className="flex items-center gap-3">
                                            {c.thumbnail && (
                                                <img src={c.thumbnail} alt={c.title} className="w-10 h-10 object-cover rounded" />
                                            )}

                                        </div>
                                    </td>

                                    <td className="p-3 border text-center space-x-2">
                                        <button
                                            onClick={() => setEditingCategory(c)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        {!c.deleted ? (
                                            <button
                                                onClick={() => setConfirmAction({ type: "delete", id: c._id, title: c.title })}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmAction({ type: "restore", id: c._id, title: c.title })}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                            >
                                                ♻ Khôi phục
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form (Add + Edit) */}
            {(editingCategory && (showAddForm || editingCategory._id)) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                {showAddForm ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
                            </h2>
                            <button
                                onClick={() => {
                                    setEditingCategory(null);
                                    setShowAddForm(false);
                                }}
                                className="p-2 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={showAddForm ? handleAdd : handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                value={editingCategory.title}
                                onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên danh mục"
                                required
                            />

                            {/* Mô tả danh mục */}
                            <textarea
                                value={editingCategory.description || ""}
                                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Mô tả danh mục"
                                rows="3"
                            />
                            {/* Upload ảnh */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEditingCategory({ ...editingCategory, thumbnail: e.target.files[0] })}
                                className="w-full border rounded px-3 py-2"
                            />

                            {/* Preview ảnh */}
                            {editingCategory.thumbnail && (
                                <div className="mt-2">
                                    <img
                                        src={editingCategory.thumbnail instanceof File ? URL.createObjectURL(editingCategory.thumbnail) : editingCategory.thumbnail}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
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

            {/* Confirm Modal */}
            {confirmAction && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg mb-4">
                            {confirmAction.type === "delete"
                                ? `Bạn có chắc muốn xóa danh mục "${confirmAction.title}"? Nếu bạn xóa danh mục này thì tất cả sản phẩm thuộc danh mục này sẽ bị xóa. Bạn vẫn chắc muốn xóa chứ ?`
                                : `Bạn có chắc muốn khôi phục danh mục "${confirmAction.title}"? Nếu bạn khôi phục danh mục này thì tất cả sản phẩm thuộc danh mục này sẽ được khôi phục. Bạn vẫn chắc muốn khôi phục chứ`}
                        </h3>
                        <div className="flex justify-end gap-4">
                            <button className="btn btn-outline" onClick={() => setConfirmAction(null)}>
                                Hủy
                            </button>
                            <button
                                className={`btn ${confirmAction.type === "delete" ? "btn-error" : "btn-success"}`}
                                onClick={handleConfirmAction}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed top-5 right-5 z-50">
                    <div className={`alert shadow-lg ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
                        <span>{toast.message}</span>
                        <button className="btn btn-sm btn-ghost ml-2" onClick={() => setToast(null)}>✕</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminCategory;
