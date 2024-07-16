import React from "react";
import { FaCheckCircle, FaDollarSign, FaLeaf } from "react-icons/fa";
import logo from "../../assets/logodas.png"; 
import aboutImage from "../../assets/aboutus.png"; 
import serviceImage1 from "../../assets/pic1.png"; 
import serviceImage2 from "../../assets/pic2.png";
const InfoPage = () => {
  return (
    <div className="bg-white text-gray-900  w-full" style={{ marginTop: '95rem' }}>
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        <section id="about" className="mb-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">Giới thiệu</h2>
            <p className="text-lg text-gray-800 mb-6">
              <strong>Công Ty Giám Định DAS</strong> đã và đang khẳng định uy tín của mình đối với
              khách hàng trong và ngoài nước và trở thành một trong những Công Ty
              Giám Định hàng đầu hiện nay. Với nhu cầu sử dụng trang sức kim
              cương, đá quý, bán quý ngày càng tăng cao, việc có những giấy chứng
              nhận giám định chất lượng và uy tín càng trở nên quan trọng đối với
              người tiêu dùng.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={aboutImage}
              alt="Giới thiệu"
              className="w-72 h-72 object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section id="services" className="mb-16">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Dịch vụ tại DAS
          </h2>

          <div className="bg-yellow-100 p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center mb-12">
            <img
              src={serviceImage1}
              alt="Giám định kim cương"
              className="w-60 h-60 object-cover rounded-lg mb-6 md:mb-0 md:mr-8"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Dịch vụ giám định kim cương</h3>
              <p className="text-lg mb-6">
                Công Ty Giám Định DAS cung cấp dịch vụ giám định kim cương chuyên nghiệp, với độ chính xác và độ tin cậy cao. Chúng tôi sử dụng các thiết bị hiện đại và công nghệ tiên tiến nhất để đảm bảo rằng mỗi viên kim cương được đánh giá đúng giá trị thực của nó.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Phân tích độ trong suốt và màu sắc của kim cương.</li>
                <li>Đánh giá cắt mài và tỷ lệ các khía cạnh.</li>
                <li>Xác minh trọng lượng và kích thước.</li>
                <li>Kiểm tra độ hoàn hảo và các đặc điểm tự nhiên.</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-100 p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center">
            <img
              src={serviceImage2}
              alt="Tư vấn kim cương"
              className="w-60 h-60 object-cover rounded-lg mb-6 md:mb-0 md:mr-8"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Dịch vụ tư vấn kim cương</h3>
              <p className="text-lg mb-6">
                Chúng tôi cung cấp dịch vụ tư vấn toàn diện về kim cương, giúp khách hàng hiểu rõ hơn về các yếu tố ảnh hưởng đến giá trị và chất lượng của kim cương. 
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Hướng dẫn mua sắm kim cương chất lượng cao.</li>
                <li>Tư vấn bảo quản và vệ sinh kim cương.</li>
                <li>Định giá và đầu tư kim cương.</li>
                <li>Phân tích xu hướng thị trường kim cương.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why-choose-das" className="mb-16">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Tại Sao Chọn DAS?</h2>
          <p className="text-xl text-center mb-8">Khám Phá Những Dịch Vụ Tốt Nhất và Chất Lượng</p>
          <p className="text-center mb-12 text-gray-600">
            DAS cung cấp các dịch vụ giám định kim cương và đá quý chuyên nghiệp, giúp bạn xác định giá trị thực sự của tài sản của mình. Dịch vụ đáng tin cậy và chất lượng cao đang chờ bạn khám phá.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <FaCheckCircle className="w-16 h-16 text-yellow-200 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Giám Định Dễ Dàng</h3>
              <p className="text-gray-600">
                Đưa kim cương của bạn đến DAS và dễ dàng nhận được kết quả giám định nhanh chóng và chính xác. Quy trình giám định đơn giản và hiệu quả.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <FaDollarSign className="w-16 h-16 text-yellow-200 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tiết Kiệm Chi Phí</h3>
              <p className="text-gray-600">
                Nhận dịch vụ giám định với chi phí hợp lý mà không cần phải chi thêm tiền. Chuyển đổi giá trị những viên kim cương của bạn thành những thông tin hữu ích.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <FaLeaf className="w-16 h-16 text-yellow-200 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lựa Chọn Bền Vững</h3>
              <p className="text-gray-600">
                Giảm thiểu lãng phí và thúc đẩy tính bền vững bằng cách sử dụng dịch vụ giám định của chúng tôi. Lựa chọn thân thiện với môi trường.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InfoPage;
