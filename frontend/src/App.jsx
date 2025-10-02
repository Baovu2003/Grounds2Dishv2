import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOrder from "./pages/admin/AdminOrder";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import AdminBlog from "./pages/admin/AdminBlog";


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
          path="/productdetail/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route path="/blog/:id" element={
          <Layout>
            <BlogDetail />
          </Layout>
        } />

        {/* <Route path="/editor" element={<Layout>
          <Editor />
        </Layout>} /> */}

        {/* Other pages */}
        {/* <Route
          path="/blog/:id"
          element={
            <Layout>
              <BlogDetailPage />
            </Layout>}
        /> */}
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
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LayoutAdmin>
                <AdminDashboard />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/category"
          element={
            <ProtectedRoute>
              <LayoutAdmin>
                <AdminCategory />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <LayoutAdmin>
                <AdminProduct />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <LayoutAdmin>
                <AdminOrder />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <LayoutAdmin>
                <AdminBlog />
              </LayoutAdmin>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
