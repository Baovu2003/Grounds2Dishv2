import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const API_URL = "http://localhost:5000/api/product-categories";

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/admin`);
            const data = await res.json();
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

    // Delete category
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
        try {
            await fetch(`${API_URL}/delete/${id}`, { method: "PATCH" });
            fetchCategories();
        } catch (error) {
            console.error("Xóa thất bại:", error);
        }
    };

    const handleRestore = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
        try {
            await fetch(`${API_URL}/restore/${id}`, { method: "PATCH" });
            fetchCategories();
        } catch (error) {
            console.error("Xóa thất bại:", error);
        }
    };

    // Save Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/edit/${editingCategory._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editingCategory.title,
                }),
            });
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error("Update thất bại:", error);
        }
    };

    // Save Add
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editingCategory.title,
                }),
            });
            setShowAddForm(false);
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error("Thêm thất bại:", error);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
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

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow mb-6">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="p-3 border">Tên danh mục</th>
                            <th className="p-3 border text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6">
                                    Không có danh mục nào
                                </td>
                            </tr>
                        ) : (
                            categories.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">{c.title}</td>
                                    <td className="p-3 border text-center space-x-2">
                                        <button
                                            onClick={() => setEditingCategory(c)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>

                                        {!c.deleted ? (
                                            <button
                                                onClick={() => handleDelete(c._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRestore(c._id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                            >
                                                ♻ Khôi phục
                                            </button>
                                        )}
                                        {/* <button
                                            onClick={() => handleDelete(c._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button> */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form (Add + Edit) */}
            {(editingCategory && (showAddForm || editingCategory._id)) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
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

                        <form
                            onSubmit={showAddForm ? handleAdd : handleUpdate}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={editingCategory.title}
                                onChange={(e) =>
                                    setEditingCategory({
                                        ...editingCategory,
                                        title: e.target.value,
                                    })
                                }
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên danh mục"
                                required
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
            )}
        </div>
    );
};

export default AdminCategory;
