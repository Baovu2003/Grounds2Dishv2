import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-white">Grounds2Dish</h3>
                <p className="text-base text-neutral-300 leading-relaxed max-w-md">
                  Biến bã cà phê thành giá trị mới. Chúng tôi tạo ra những sản
                  phẩm bền vững, thân thiện với môi trường từ nguồn phụ phẩm
                  tự nhiên.
                </p>
              </div>
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { name: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.34 2h11.32C19.36 2 20 2.64 20 3.34v11.32c0 .7-.64 1.34-1.34 1.34H6.34c-.7 0-1.34-.64-1.34-1.34V3.34C5 2.64 5.64 2 6.34 2z" },
                  { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group p-3 rounded-xl bg-neutral-800 hover:bg-primary-500 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Liên kết nhanh</h4>
              <ul className="space-y-3">
                {["Về chúng tôi", "Sản phẩm", "Tin tức", "Liên hệ", "Chính sách"].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 group flex items-center"
                    >
                      <span className="w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-primary-500 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-neutral-300 leading-relaxed">
                  Hoà Lạc - Thạch Thất , Hanoi, Vietnam
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-primary-500 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-neutral-300">+84 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-primary-500 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-neutral-300">hello@grounds2dish.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © 2025 Grounds2Dish. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm">
              {["Chính sách bảo mật", "Điều khoản sử dụng", "Cookies"].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
