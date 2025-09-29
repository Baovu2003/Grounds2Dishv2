import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function AddBlogForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !content || !author) return alert("Vui lòng điền đủ thông tin")
    
    const newBlog = {
      _id: Date.now().toString(),
      title,
      description,
      content,
      thumbnail: thumbnail || "https://source.unsplash.com/800x400/?coffee",
      author,
      createdAt: new Date().toISOString(),
    }
    
    onAdd(newBlog)

    // reset form
    setTitle("")
    setDescription("")
    setContent("")
    setThumbnail("")
    setAuthor("")
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-4">Thêm Blog Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Nội dung</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Thumbnail (URL)</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Tác giả</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Thêm Blog
        </button>
      </form>
    </div>
  )
}
