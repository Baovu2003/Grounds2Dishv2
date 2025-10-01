import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingContactBar from "./FloatingContactBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <FloatingContactBar side="right" vertical="middle" />
      <Footer />
    </div>
  );
};
export default Layout;
