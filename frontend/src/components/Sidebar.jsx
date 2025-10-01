import { Link, useLocation, useNavigate } from "react-router";
import { BellIcon, HomeIcon, UsersIcon, LogOutIcon } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và thông tin user
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect về login
  };

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <img
          src="/images/logo.jpg"
          alt="Grounds2Dish Logo"
          className="h-12 w-12 rounded-xl object-cover shadow"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Grounds2Dish</h1>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Sustainable Living
          </p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/admin"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/category"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin/category" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Category</span>
        </Link>

        <Link
          to="/admin/product"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin/product" ? "btn-active" : ""}`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Product</span>
        </Link>

        <Link
          to="/admin/orders"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin/orders" ? "btn-active" : ""}`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Orders</span>
        </Link>

        <Link
          to="/admin/blog"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin/blog" ? "btn-active" : ""}`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Blog</span>
        </Link>

        {/* Nút Đăng xuất */}
        <button
          onClick={handleLogout}
          className="btn btn-ghost justify-start w-full gap-3 px-3 normal-case mt-4"
        >
          <LogOutIcon className="size-5 text-base-content opacity-70" />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
