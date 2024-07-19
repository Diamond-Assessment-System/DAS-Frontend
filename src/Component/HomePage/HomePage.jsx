// import * as React from "react";
// import sampleImage from "../../assets/backgrounddas.png"; // Đảm bảo đường dẫn đến ảnh là chính xác
// import ContactModal from "../contact/ContactModal"; // Đảm bảo đường dẫn đến ContactModal là chính xác

// function MyComponent() {
//   return (
//     <>
//       <div className="flex justify-center">
//         <img src={sampleImage} alt="Sample" className="h-full w-full" />
//         <ContactModal />
//       </div>
//     </>
//   );
// }

// export default MyComponent;
import * as React from "react";
import { useState, useEffect } from "react";
import sampleImage1 from "../../../public/backgrounddas.png"; // Đảm bảo đường dẫn đến ảnh là chính xác
import sampleImage2 from "../../../public/backgrounddas1.png";
import sampleImage3 from "../../../public/backgrounddas2.png";
import { FaGem, FaCertificate, FaRegHandshake } from "react-icons/fa";
import ContactModal from "../contact/ContactModal";
const images = [sampleImage1, sampleImage2, sampleImage3];

function MyComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Đổi hình ảnh mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div  className="bg-gray-50 text-gray-800 " style={{ marginTop: '8rem' }}>
      {/* Phần Slideshow */}
      <div className="relative w-4/5 h-[500px] mx-auto rounded-lg overflow-hidden shadow-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hình ảnh trình chiếu ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="bottom-4 left-0 right-0 flex justify-center ">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Phần Giới Thiệu Về DAS */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-semibold mb-8 text-blue-900">
            Giới Thiệu Về DAS
          </h2>
          <p className="text-xl leading-relaxed text-gray-800">
            DAS là công ty giám định kim cương hàng đầu, cung cấp các đánh giá
            chính xác và chuyên nghiệp cho những viên đá quý của bạn. Chúng tôi
            cam kết đảm bảo rằng kim cương của bạn được định giá với sự chính
            xác và chăm sóc tối đa.
          </p>
        </div>
      </section>

      {/* Phần Dịch Vụ Của Chúng Tôi */}
      <section className="w-full py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-semibold mb-6 text-blue-900">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaGem className="text-6xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Giám Định Kim Cương
              </h3>
              <p className="text-gray-600">
                Nhận đánh giá chính xác về kim cương của bạn từ các chuyên gia
                được chứng nhận của chúng tôi.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaCertificate className="text-6xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Dịch Vụ Chứng Nhận
              </h3>
              <p className="text-gray-600">
                Nhận các tài liệu chứng nhận chính thức cho những viên kim cương
                quý giá của bạn.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaRegHandshake className="text-6xl text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Tư Vấn</h3>
              <p className="text-gray-600">
                Tư vấn với các chuyên gia của chúng tôi để hiểu rõ giá trị và
                chất lượng của kim cương của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phần Liên Hệ */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-semibold mb-6 text-blue-900">Liên Hệ</h2>
          <p className="text-lg text-gray-800 mb-6">
            Liên hệ với chúng tôi để biết thêm thông tin hoặc để đặt lịch hẹn.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Đặt Lịch Hẹn
            </button>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Đăng Nhập / Đăng Ký
            </button>
            
          </div>
        </div>
      </section>
      <ContactModal />
    </div>
    
  );
}

export default MyComponent;

