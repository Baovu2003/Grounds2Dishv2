import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

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
            <Shop/>
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
            <BlogDetailPage/>
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
      </Routes>
    </div>
  );
};
export default App;
