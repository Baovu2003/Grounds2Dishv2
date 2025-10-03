import React from "react";
import { Link } from "react-router";
import { ArrowRight, Users, Target, Award, Heart, Globe, Coffee, Leaf } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Trần Thu Hoài",
      role: "CEO & Founder",
      image: "/images/anh1.jpg",
      description: "Với nhiều năm kinh nghiệm dày dặn thông quá môi trường học cũng như đã đào tạo và trải nghiệm trong môi trường thực tế"
    },
    {
      name: "Hoàng Thị Cẩm Ly",
      role: "Marketing",
      image: "/images/anh2.jpg",
      description: "Chuyên gia trong lĩnh vực chiến lược tiếp thị, quảng cáo và xây dựng thương hiệu"
    },
    {
      name: "Lê Văn C",
      role: "Head of Marketing",
      image: "/images/anh3.jpg",
      description: "Chuyên gia marketing bền vững và phát triển thương hiệu"
    },
    {
      name: "Lê Văn C",
      role: "Head of Marketing",
      image: "/images/anh3.jpg",
      description: "Chuyên gia marketing bền vững và phát triển thương hiệu"
    },
    {
      name: "Lê Văn C",
      role: "Head of Marketing",
      image: "/images/anh3.jpg",
      description: "Chuyên gia marketing bền vững và phát triển thương hiệu"
    }
  ];

  const milestones = [
    {
      year: "Tháng 8",
      title: "Thành lập dự án",
      description: "Grounds2Dish được thành lập với sứ mệnh biến bã cà phê thành giá trị mới"
    },
    {
      year: "2021",
      title: "Sản phẩm đầu tiên",
      description: "Ra mắt dòng sản phẩm ly tái chế từ bã cà phê đầu tiên"
    },
    {
      year: "2022",
      title: "Mở rộng thị trường",
      description: "Xuất khẩu sản phẩm ra 10 quốc gia đầu tiên"
    },
    {
      year: "2023",
      title: "Công nhận quốc tế",
      description: "Nhận giải thưởng 'Sản phẩm bền vững tốt nhất' tại Châu Á"
    },
    {
      year: "2024",
      title: "Phát triển toàn cầu",
      description: "Hiện diện tại hơn 50 quốc gia trên toàn thế giới"
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
              About Us
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
                  src="/images/header-background1.jpg"
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
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong hành trình xây dựng Grounds2Dish
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neutral-200 to-neutral-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                      <div className="text-2xl font-bold mb-2" style={{ color: '#20161F' }}>
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-neutral-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full border-4 border-neutral-200 flex items-center justify-center relative z-10"
                    style={{ borderColor: '#20161F' }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#20161F' }}></div>
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
