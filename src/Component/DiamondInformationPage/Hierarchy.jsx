import React from 'react';
import './Hierarchy.css';
import kimCuongImage from '../../assets/KimCuong.jpg'; // Adjust the path if necessary
import CutGrade from '../../assets/CutGrade.jpg';
import ColorGrading from '../../assets/ColorGrading.jpg';

const Hierarchy = () => {
  const [hoveredImage, setHoveredImage] = React.useState(null); // Define state for hovered image

  return (
    <div>
<div className="image-container">
  <img src={kimCuongImage} alt="Phân Cấp Kim Cương" />
  <div className="overlay-text">
    <h2>Phân Cấp Kim Cương</h2>
    <a href="/" className="back-link">Trang chủ</a>
  </div>
</div>
      <div className="content">
        {/* <div className="section">
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
              <div
                className={`bg-zinc-300 h-64 w-full rounded-lg shadow-md cursor-pointer transform scale-100 transition-transform duration-300 ${
                  hoveredImage === ColorGrading ? "scale-110" : ""
                }`}
                onMouseEnter={() => setHoveredImage(ColorGrading)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{
                  backgroundImage: `url(${ColorGrading})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className={`text-3xl font-bold ${hoveredImage === ColorGrading ? "text-yellow-500" : ""}`}>
              Phân Cấp Màu Sắc - Color Grading
              </h4>
              <p className="text-lg text-yellow-600 mt-4">
                Thang phân cấp màu D-Z: Hệ thống phân cấp màu D-đến-Z của GIA đánh giá sự hiện diện hay vắng mặt của màu sắc – phổ biến là màu vàng nhạt
                , nâu nhạt và xám nhạt. Thang đo dùng để 
               </p>
               <a href="#">Xem chi tiết</a>
            </div>
          </div>
        </div>
        <div className="section">
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
              <div
                className={`bg-zinc-300 h-64 w-full rounded-lg shadow-md cursor-pointer transform scale-100 transition-transform duration-300 ${
                  hoveredImage === CutGrade ? "scale-110" : ""
                }`}
                onMouseEnter={() => setHoveredImage(CutGrade)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{
                  backgroundImage: `url(${CutGrade})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className={`text-3xl font-bold ${hoveredImage === CutGrade ? "text-yellow-500" : ""}`}>
              Cấp Độ Cắt Mài – Cut Grade
              </h4>
              <p className="text-lg text-yellow-600 mt-4">
                Cắt mài kim cương có thể hiểu đơn giản là hình dạng và kiểu cắt mài 
                (hình dạng các mặt giác) của nó. Có nhiều kiểu cắt kim cương khác nhau, 
                cho đến nay phổ biến nhất vẫn là kiểu </p>
                <a href="#">Xem chi tiết</a>
            </div>
          </div>
        </div> */}
              <div className="flex flex-col mt-28 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {[{ image: CutGrade, name: "Phân Cấp Màu Sắc - Color Grading" }, { image: ColorGrading, name: "Cấp Độ Cắt Mài – Cut Grade" }].map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
              {/* <Link
                to={`/diamonds/${item.name.toLowerCase()}`} */}
                {/* className="w-full max-w-sm"
              > */}
                <div
                  className={`bg-zinc-300 h-64 w-full rounded-lg shadow-md cursor-pointer transform scale-100 transition-transform duration-300 ${
                    hoveredImage === item.image ? "scale-110" : ""
                  }`}
                  onMouseEnter={() => setHoveredImage(item.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              {/* </Link> */}
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className={`text-3xl font-bold ${hoveredImage === item.image ? "text-yellow-500" : ""}`}>{item.name}</h2>
              <p className="text-lg text-yellow-600 mt-4">Mô Tả</p>
              {/* <Link to={`/diamonds/${item.name.toLowerCase()}`}> */}
              {/* <Link to={}> */}
                <button className="mt-8 py-3 px-6 bg-amber-300 text-black font-semibold rounded-md shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2">
                  Xem Chi Tiết
                </button>
              {/* </Link> */}
            </div>
          </div>
        ))}
        <br /> <br />
      </div>
      </div>
    </div>
  );
};

export default Hierarchy;
