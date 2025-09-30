import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOrder from "./pages/admin/AdminOrder";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>}
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Layout>
              <BlogDetailPage />
            </Layout>}
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <LayoutAdmin>
              <AdminDashboard />
            </LayoutAdmin>
          }
        />

        <Route
          path="/admin/category"
          element={
            <LayoutAdmin>
              <AdminCategory />
            </LayoutAdmin>
          }
        />

        <Route
          path="/admin/product"
          element={
            <LayoutAdmin>
              <AdminProduct />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <LayoutAdmin>
              <AdminOrder />
            </LayoutAdmin>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
