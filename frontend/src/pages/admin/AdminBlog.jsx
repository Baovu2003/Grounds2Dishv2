import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { apiAdminClient } from "../../constants/apiUrl";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState(null);

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/blogs/admin");
            setBlogs(data);
        } catch (error) {
            console.error("Lỗi khi fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle Add
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", editingBlog.title);
            formData.append("description", editingBlog.description || "");
            formData.append("article", editingBlog.article || "");
            formData.append("publishedAt", editingBlog.publishedAt || new Date().toISOString());
            if (editingBlog.bannerImage instanceof File) {
                formData.append("bannerImage", editingBlog.bannerImage);
            }

            await apiAdminClient("/blogs/create", {
                method: "POST",
                body: formData,
            });

            setShowAddForm(false);
            setEditingBlog(null);
            fetchBlogs();
            setToast({ message: "Thêm blog thành công!", type: "success" });
        } catch (error) {
            console.error("Thêm blog thất bại:", error);
            setToast({ message: "Thêm blog thất bại!", type: "error" });
        }
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", editingBlog.title);
            formData.append("description", editingBlog.description || "");
            formData.append("article", editingBlog.article || "");
            formData.append("publishedAt", editingBlog.publishedAt || new Date().toISOString());
            if (editingBlog.bannerImage instanceof File) {
                formData.append("bannerImage", editingBlog.bannerImage);
            }

            await apiAdminClient(`/blogs/edit/${editingBlog._id}`, {
                method: "PATCH",
                body: formData,
            });

            setEditingBlog(null);
            fetchBlogs();
            setToast({ message: "Cập nhật blog thành công!", type: "success" });
        } catch (error) {
            console.error("Update thất bại:", error);
            setToast({ message: "Cập nhật blog thất bại!", type: "error" });
        }
    };

    // Confirm Delete/Restore
    const handleConfirmAction = async () => {
        if (!confirmAction) return;
        const { type, id } = confirmAction;
        try {
            await apiAdminClient(
                `/blogs/${type === "delete" ? "delete" : "restore"}/${id}`,
                { method: "PATCH" }
            );
            fetchBlogs();
            setToast({
                message: type === "delete" ? "Xóa blog thành công!" : "Khôi phục blog thành công!",
                type: "success",
            });
        } catch {
            setToast({
                message: type === "delete" ? "Xóa blog thất bại!" : "Khôi phục blog thất bại!",
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

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quản lý Blog</h1>
                <button
                    onClick={() => {
                        setEditingBlog({ title: "" });
                        setShowAddForm(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    <Plus className="w-5 h-5" /> Thêm blog
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow mb-6">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="p-3 border">Tiêu đề</th>
                            <th className="p-3 border">Mô tả</th>
                            <th className="p-3 border">Ảnh</th>
                            <th className="p-3 border">Ngày xuất bản</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6">Đang tải...</td>
                            </tr>
                        ) : blogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6">Không có blog nào</td>
                            </tr>
                        ) : (
                            blogs.map((b) => (
                                <tr key={b._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">{b.title}</td>
                                    <td className="p-3 border">{b.article}</td>
                                    <td className="p-3 border">
                                        {b.bannerImage && (
                                            <img src={b.bannerImage} alt={b.title} className="w-16 h-16 object-cover rounded" />
                                        )}
                                    </td>
                                    <td className="p-3 border">{new Date(b.publishedAt).toLocaleDateString()}</td>
                                    <td className="p-3 border text-center space-x-2">
                                        <button
                                            onClick={() => setEditingBlog(b)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        {!b.deleted ? (
                                            <button
                                                onClick={() => setConfirmAction({ type: "delete", id: b._id, title: b.title })}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmAction({ type: "restore", id: b._id, title: b.title })}
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
            {(editingBlog && (showAddForm || editingBlog._id)) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{showAddForm ? "Thêm blog" : "Chỉnh sửa blog"}</h2>
                            <button
                                onClick={() => {
                                    setEditingBlog(null);
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
                                value={editingBlog.title}
                                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tiêu đề"
                                required
                            />

                            <textarea
                                value={editingBlog.article || ""}
                                onChange={(e) => setEditingBlog({ ...editingBlog, article: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Nội dung bài viết"
                                rows="5"
                            />
                            <input
                                type="date"
                                value={editingBlog.publishedAt ? new Date(editingBlog.publishedAt).toISOString().split("T")[0] : ""}
                                onChange={(e) => setEditingBlog({ ...editingBlog, publishedAt: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setEditingBlog({ ...editingBlog, bannerImage: e.target.files[0] })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {editingBlog.bannerImage && (
                                <div className="mt-2">
                                    <img
                                        src={editingBlog.bannerImage instanceof File ? URL.createObjectURL(editingBlog.bannerImage) : editingBlog.bannerImage}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                                {showAddForm ? "Thêm mới" : "Lưu thay đổi"}
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
                                ? `Bạn có chắc muốn xóa blog "${confirmAction.title}"?`
                                : `Bạn có chắc muốn khôi phục blog "${confirmAction.title}"?`}
                        </h3>
                        <div className="flex justify-end gap-4">
                            <button className="btn btn-outline" onClick={() => setConfirmAction(null)}>Hủy</button>
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

export default AdminBlog;
