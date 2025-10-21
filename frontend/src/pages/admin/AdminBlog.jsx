import { useEffect, useRef, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { apiAdminClient } from "../../constants/apiUrl";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [toast, setToast] = useState(null);
    const articleRef = useRef(null);
    const lastSelectionRef = useRef({ start: 0, end: 0 });

    const insertTextAtCursor = (text, posOverride) => {
        const textarea = articleRef.current;
        if (!textarea) return;
        // if textarea not focused, append at end
        const content = editingBlog.article || "";
        let start;
        let end;
        if (posOverride && typeof posOverride.start === 'number') {
            start = posOverride.start;
            end = posOverride.end ?? posOverride.start;
        } else {
            start = typeof textarea.selectionStart === "number" ? textarea.selectionStart : content.length;
            end = typeof textarea.selectionEnd === "number" ? textarea.selectionEnd : content.length;
        }
        // ensure each insertion starts on a new line
        const needLeadingNewline = start > 0 && content[start - 1] !== "\n";
        const insert = `${needLeadingNewline ? "\n" : ""}${text}`;
        const before = content.slice(0, start);
        const after = content.slice(end);
        const next = `${before}${insert}${after}`;
        setEditingBlog({ ...editingBlog, article: next });
        requestAnimationFrame(() => {
            const pos = (before + insert).length;
            textarea.selectionStart = textarea.selectionEnd = pos;
            textarea.focus();
            lastSelectionRef.current = { start: pos, end: pos };
        });
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast({ message: "Đã copy link ảnh", type: "success" });
        } catch {
            setToast({ message: "Copy thất bại", type: "error" });
        }
    };

    const focusToImageByName = (name) => {
        const textarea = articleRef.current;
        if (!textarea) return;
        const content = editingBlog.article || "";
        const token = `![${name}](`;
        const idx = content.indexOf(token);
        if (idx >= 0) {
            const pos = idx + token.length;
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = pos;
        }
    };

    // Fetch blogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/blogs/admin");
            // Xử lý response - đảm bảo luôn là array
            const blogsData = Array.isArray(data) ? data : (data?.data || []);
            setBlogs(blogsData);
        } catch (error) {
            console.error("Lỗi khi fetch blogs:", error);
            setBlogs([]);
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
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", editingBlog.title);
            formData.append("description", editingBlog.description || "");
            formData.append("article", editingBlog.article || "");
            formData.append("publishedAt", editingBlog.publishedAt || new Date().toISOString());
            if (editingBlog.bannerImage instanceof File) {
                formData.append("bannerImage", editingBlog.bannerImage);
            }
            if (Array.isArray(editingBlog.contentImages)) {
                editingBlog.contentImages.forEach((img) => {
                    if (img instanceof File) {
                        formData.append("contentImages", img);
                    }
                });
            }
            if (Array.isArray(editingBlog.contentImageUrls) && editingBlog.contentImageUrls.length) {
                formData.append("contentImageUrls", JSON.stringify(editingBlog.contentImageUrls));
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
            formData.append("title", editingBlog.title);
            formData.append("description", editingBlog.description || "");
            formData.append("article", editingBlog.article || "");
            formData.append("publishedAt", editingBlog.publishedAt || new Date().toISOString());
            if (editingBlog.bannerImage instanceof File) {
                formData.append("bannerImage", editingBlog.bannerImage);
            }
            if (Array.isArray(editingBlog.contentImages)) {
                editingBlog.contentImages.forEach((img) => {
                    if (img instanceof File) {
                        formData.append("contentImages", img);
                    }
                });
            }
            if (Array.isArray(editingBlog.contentImageUrls) && editingBlog.contentImageUrls.length) {
                formData.append("contentImageUrls", JSON.stringify(editingBlog.contentImageUrls));
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
                        setEditingBlog({ title: "", contentImages: [] });
                        setShowAddForm(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition"
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
                            Array.isArray(blogs) && blogs.map((b) => (
                                <tr key={b._id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 border">{b.title}</td>
                                    <td className="p-3 border">{b.article}</td>
                                    <td className="p-3 border">
                                        {b.bannerImage && (
                                            <img src={b.bannerImage} alt={b.title} className="w-16 h-16 object-cover rounded" />
                                        )}
                                    </td>
                                    {/* Optionally show number of content images */}
                                    {/* <td className="p-3 border">{Array.isArray(b.contentImages) ? b.contentImages.length : 0} ảnh</td> */}
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
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg max-h-[85vh] overflow-y-auto">
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

                        <form onSubmit={showAddForm ? handleAdd : handleUpdate} className="space-y-5">
                            {/* Title like a big editor heading */}
                            <input
                                type="text"
                                value={editingBlog.title}
                                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                                className="w-full text-4xl md:text-5xl font-bold border-0 focus:ring-0 px-0 py-2 placeholder-gray-400"
                                placeholder="How to make a blogging website"
                                required
                            />

                            {/* Banner image uploader (moved to top) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">Ảnh tiêu đề (Banner)</label>
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
                                            className="w-full max-h-60 object-contain rounded-lg border"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Writing area */}
                            <textarea
                                value={editingBlog.article || ""}
                                onChange={(e) => setEditingBlog({ ...editingBlog, article: e.target.value })}
                                ref={articleRef}
                                className="w-full h-80 md:h-96 border rounded-lg px-4 py-3 text-lg overflow-y-auto"
                                placeholder="Start writing here..."
                                onClick={(e) => {
                                    lastSelectionRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd };
                                }}
                                onKeyUp={(e) => {
                                    lastSelectionRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd };
                                }}
                                onSelect={(e) => {
                                    lastSelectionRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd };
                                }}
                            />

                            {/* Bottom toolbar: Upload images + Publish */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="content-images-input"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={async (e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length === 0) return;
                                        // Upload files sequentially and collect URLs
                                        const uploadedUrls = [];
                                        for (const file of files) {
                                            const formData = new FormData();
                                            formData.append("image", file);
                                            try {
                                                const url = await apiAdminClient("/blogs/upload", { method: "POST", body: formData });
                                                uploadedUrls.push({ name: file.name, url });
                                            } catch (err) {
                                                console.error("Upload image failed", err);
                                                setToast({ message: "Upload ảnh thất bại", type: "error" });
                                            }
                                        }

                                        // Build new article content by inserting at last caret position
                                        const textarea = articleRef.current;
                                        const currentContent = (editingBlog.article || "");
                                        const start = lastSelectionRef.current.start ?? currentContent.length;
                                        const end = lastSelectionRef.current.end ?? start;
                                        const before = currentContent.slice(0, start);
                                        const after = currentContent.slice(end);
                                        let insertion = '';
                                        const needLeadingNewline = start > 0 && currentContent[start - 1] !== "\n";
                                        if (needLeadingNewline) insertion += "\n";
                                        uploadedUrls.forEach(({ name, url }, index) => {
                                            insertion += `![${name}](${url})` + "\n";
                                        });
                                        const newContent = before + insertion + after;

                                        // Update state once to avoid race conditions
                                        setEditingBlog((prev) => ({
                                            ...prev,
                                            article: newContent,
                                            contentImages: Array.isArray(prev.contentImages) ? [...prev.contentImages, ...files] : files,
                                            contentImageUrls: Array.isArray(prev.contentImageUrls)
                                                ? [...prev.contentImageUrls, ...uploadedUrls.map(x => x.url)]
                                                : uploadedUrls.map(x => x.url),
                                        }));

                                        // Restore caret after insertion
                                        requestAnimationFrame(() => {
                                            const pos = (before + insertion).length;
                                            if (textarea) {
                                                textarea.focus();
                                                textarea.selectionStart = textarea.selectionEnd = pos;
                                                lastSelectionRef.current = { start: pos, end: pos };
                                            }
                                        });

                                        e.target.value = "";
                                    }}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    onClick={() => document.getElementById("content-images-input").click()}
                                >
                                    Upload Image
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="ml-auto px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Đang xử lý..." : (showAddForm ? "Publish" : "Save")}
                                </button>
                            </div>

                            {/* Links are now inserted directly into the editor; below preview list removed per request */}
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
