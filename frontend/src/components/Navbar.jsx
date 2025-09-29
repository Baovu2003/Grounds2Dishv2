import { Link } from "react-router";
import {
  BellIcon,
  LogOutIcon,
  ShipWheelIcon,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import ThemeSelector from "./ThemeSelector";
import useCartStore from "../store/useCartStore";

const Navbar = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/98 backdrop-blur-xl border-b border-neutral-100 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-28">
          {/* LOGO SECTION */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img
                  src="/images/logo.jpg"
                  alt="Grounds2Dish Logo"
                  className="relative h-20 w-20 rounded-3xl shadow-medium object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-large"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-display font-bold text-neutral-900 tracking-tight group-hover:text-primary-600 transition-colors duration-300 drop-shadow-sm">
                  Grounds2Dish
                </span>
                <span className="text-base text-neutral-600 font-body font-semibold tracking-wider uppercase">
                  Sustainable Living
                </span>
              </div>
            </Link>
          </div>
          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop Online" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About Us" }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="relative px-8 py-4 rounded-2xl font-body font-bold text-lg text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 rounded-2xl bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary-500 transition-all duration-300 group-hover:w-12"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4">
            <Link to={"/notifications"}>
              <button className="relative p-5 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group">
                <BellIcon className="h-8 w-8" />
                <div className="absolute inset-0 rounded-2xl bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            </Link>

            {/* <ThemeSelector /> */}

            <Link to="/cart" className="relative group">
              <button className="relative p-5 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300">
                <ShoppingCart className="h-8 w-8" />
                <div className="absolute inset-0 rounded-2xl bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-error to-red-500 text-white text-base rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-medium animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative p-5 rounded-2xl text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
              <div className="absolute inset-0 rounded-2xl bg-primary-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-xl">
            <div className="px-8 py-10 space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop Online" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About Us" }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-5 rounded-2xl font-body font-bold text-xl text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
