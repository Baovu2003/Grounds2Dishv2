import React from "react";
import { Link } from "react-router";
import { ArrowRight, Users, Target, Award, Heart, Globe, Coffee, Leaf } from "lucide-react";


const About = () => {
  const teamMembers = [
    {
      name: "Trần Thu Hoài",
      role: "CEO & Founder",
      image: "/images/ThuHoai.jpg",
      description: "Là người sáng lập và dẫn dắt dự án Grounds2Dish, Trần Thu Hoài giữ vai trò định hướng chiến lược và quản lý toàn bộ hoạt động của doanh nghiệp. Với tinh thần khởi nghiệp xanh và niềm đam mê phát triển bền vững, chị Hoài là người khởi xướng ý tưởng “Giá trị mới từ dư vị cũ”, biến bã cà phê tưởng chừng vô dụng thành những sản phẩm thân thiện với môi trường.Tầm nhìn của chị là đưa Grounds2Dish trở thành thương hiệu Việt tiên phong trong tái chế và sản xuất sản phẩm sinh học."
    },
    {
      name: "Hoàng Thị Cẩm Ly",
      role: "CFO(Chief Financial Officer)",
      image: "/images/HoangLy.jpg",
      description: "Hoàng Thị Cẩm Ly phụ trách quản lý tài chính và hoạch định ngân sách cho dự án. Chị đảm bảo mọi hoạt động đầu tư, chi phí sản xuất và phân phối được tối ưu hiệu quả. Với tư duy phân tích sắc bén và khả năng dự báo tài chính tốt, chị Ly đóng vai trò quan trọng trong việc giúp Grounds2Dish phát triển bền vững, minh bạch và có lộ trình tăng trưởng rõ ràng.Chị tin rằng: “Tài chính bền vững là nền móng của một thương hiệu xanh vững mạnh.”"
    },
    {
      name: "Nguyễn Thị Linh",
      role: "CCO(Chief Communication Officer)",
      image: "/images/linh.jpg",
      description: "Nguyễn Thị Linh là người định hình và triển khai chiến lược truyền thông, xây dựng hình ảnh thương hiệu Grounds2Dish gần gũi với cộng đồng. Với khả năng sáng tạo nội dung và kết nối tốt, chị Linh giúp lan tỏa thông điệp sống xanh, giảm rác thải và bảo vệ môi trường đến giới trẻ, sinh viên và người tiêu dùng hiện đại.Chị luôn hướng tới việc biến mỗi sản phẩm Grounds2Dish thành một câu chuyện truyền cảm hứng."
    },
    {
      name: "Nghiêm Thị Thanh Nhã",
      role: "CMO(Chief Marketing Officer)",
      image: "/images/thanhnha.jpg",
      description: "Giữ vai trò Giám đốc Marketing, Nghiêm Thị Thanh Nhã chịu trách nhiệm nghiên cứu thị trường, phát triển sản phẩm và hoạch định chiến lược marketing tổng thể. Với tinh thần sáng tạo và am hiểu xu hướng tiêu dùng xanh, chị Nhã giúp Grounds2Dish khẳng định vị thế thương hiệu Việt tiên phong trong dòng sản phẩm sinh học từ bã cà phê.Chị tin rằng marketing không chỉ là bán hàng, mà là lan tỏa lối sống xanh."
    },
    {
      name: "Hoàng Đức Anh",
      role: "CIO(Chief Innovation Officer)",
      image: "/images/ducanh.jpg",
      description: "Hoàng Đức Anh là người phụ trách công nghệ và đổi mới sáng tạo trong dự án. Anh chịu trách nhiệm nghiên cứu quy trình tái chế bã cà phê, cải tiến công nghệ sản xuất và đảm bảo chất lượng sản phẩm. Với tư duy kỹ thuật và đam mê sáng tạo, anh Đức Anh góp phần quan trọng trong việc hiện thực hóa ý tưởng biến bã cà phê thành những sản phẩm bền vững và thân thiện với môi trường.Anh luôn tâm niệm: “Đổi mới là chìa khóa để phát triển bền vững.”"
    }
  ];

  const milestones = [
    {
      year: "Đầu năm 2025",
      title: " Thành lập dự án Grounds2Dish",
      description: "Dự án Grounds2Dish chính thức được thành lập với sứ mệnh tái chế bã cà phê thành sản phẩm sinh học thân thiện môi trường, hướng tới xây dựng lối sống xanh và kinh tế tuần hoàn."
    },
    {
      year: "Tháng 6/2025",
      title: "Nghiên cứu, kiểm định & hoàn thiện sản phẩm",
      description: "Tiến hành nghiên cứu công thức tái chế, kiểm định chất lượng, và thiết kế bao bì cho các sản phẩm đầu tiên: cốc, dao, dĩa, muỗng từ bã cà phê."
    },
    {
      year: "Tháng 8/2025",
      title: "Hoàn thiện thương hiệu & chuẩn bị ra mắt",
      description: "Hoàn tất bộ nhận diện thương hiệu, chiến dịch truyền thông “Giá trị mới từ dư vị cũ” và hệ thống bán hàng trực tuyến"
    },
    {
      year: " Ngày 26/10/2025",
      title: "– Ra mắt sản phẩm & website chính thức",
      description: "Grounds2Dish chính thức ra mắt bộ sản phẩm và website thương mại điện tử, đánh dấu bước ngoặt quan trọng trong hành trình phát triển thương hiệu xanh Việt Nam."
    },
    {
      year: "Cuối năm 2025",
      title: "Mở rộng hợp tác & truyền thông cộng đồng",
      description: "Hợp tác với quán cà phê, doanh nghiệp xanh để thu gom bã cà phê, đồng thời triển khai chuỗi hoạt động lan tỏa ý thức bảo vệ môi trường."
    },
    {
      year: "Tầm nhìn 2026 ",
      title: " Vươn tầm thương hiệu xanh Việt",
      description: "Grounds2Dish đặt mục tiêu mở rộng thị trường trong nước và quốc tế, tham gia triển lãm khởi nghiệp xanh và hội chợ môi trường, khẳng định vị thế thương hiệu Việt tiên phong trong tái chế bã cà phê"
    }
  ];

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Bền vững",
      description: "Cam kết tạo ra sản phẩm thân thiện với môi trường và có tác động tích cực đến hành tinh"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Cộng đồng",
      description: "Xây dựng cộng đồng những người yêu thích lối sống xanh và bền vững"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Chất lượng",
      description: "Đảm bảo mọi sản phẩm đều đạt tiêu chuẩn chất lượng cao nhất"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Toàn cầu",
      description: "Mang sản phẩm bền vững đến mọi ngóc ngách trên thế giới"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 50%, #1a0f1a 100%)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-white/80 mb-4">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Về Grounds2Dish
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Sứ mệnh của chúng tôi là biến bã cà phê thành những sản phẩm hữu ích,
              góp phần xây dựng một tương lai bền vững cho hành tinh
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-10">
          <img src="/images/logo1.jpg" alt="Decorative" className="w-full h-full object-contain rounded-full" />
        </div>
        <div className="absolute bottom-10 left-10 w-24 h-24 opacity-10">
          <img src="/images/logo.jpg" alt="Decorative" className="w-full h-full object-contain rounded-full" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <ol className="flex items-center space-x-3 text-lg">
            <li>
              <Link
                to="/"
                className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium relative group"
                onMouseEnter={(e) => e.target.style.color = '#20161F'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all group-hover:w-full"
                  style={{ backgroundColor: '#20161F' }}></span>
              </Link>
            </li>
            <li>
              <span className="text-neutral-400">/</span>
            </li>
            <li className="text-neutral-900 font-semibold">
              Về chúng tôi
            </li>
          </ol>
        </nav>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                Tại Grounds2Dish, chúng tôi tin rằng mọi thứ đều có thể được tái sử dụng và tái chế.
                Bã cà phê - một phụ phẩm tưởng chừng như vô dụng - đã trở thành nguồn cảm hứng
                cho chúng tôi tạo ra những sản phẩm bền vững và hữu ích.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                Chúng tôi cam kết mang đến những giải pháp thân thiện với môi trường,
                góp phần giảm thiểu rác thải nhựa và xây dựng một tương lai bền vững cho thế hệ mai sau.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                  boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
                }}
              >
                Khám phá sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/images/IMG_3313.JPG"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Coffee className="w-12 h-12" style={{ color: '#20161F' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động và quyết định của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(32, 22, 31, 0.1)' }}>
                  <div style={{ color: '#20161F' }}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">
              Hành trình phát triển
            </h2>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Những cột mốc quan trọng trong hành trình xây dựng Grounds2Dish
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-neutral-200 to-neutral-300"></div>

            <div className="space-y-5">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-3 text-right" : "pl-3 text-left"
                      }`}
                  >
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
                      <div
                        className="text-base font-semibold mb-1"
                        style={{ color: "#20161F" }}
                      >
                        {milestone.year}
                      </div>
                      <h3 className="text-sm font-bold text-neutral-900 mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-snug">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="w-4 h-4 bg-white rounded-full border-2 flex items-center justify-center relative z-10"
                    style={{ borderColor: "#20161F" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#20161F" }}
                    ></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Những con người đam mê và tài năng đang xây dựng tương lai bền vững
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 text-center hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-lg font-semibold mb-3" style={{ color: '#20161F' }}>
                  {member.role}
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl p-12 shadow-sm border border-neutral-100 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
              Hãy cùng chúng tôi xây dựng tương lai bền vững
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Tham gia hành trình của chúng tôi và cùng nhau tạo ra những thay đổi tích cực
              cho môi trường và cộng đồng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                  boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
                }}
              >
                Mua sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border-2"
                style={{
                  color: '#20161F',
                  borderColor: '#20161F',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#20161F';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#20161F';
                }}
              >
                Đọc blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
