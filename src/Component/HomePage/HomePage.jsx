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
import sampleImage from "../../assets/backgrounddas.png"; // Đảm bảo đường dẫn đến ảnh là chính xác
import ContactModal from "../contact/ContactModal"; // Đảm bảo đường dẫn đến ContactModal là chính xác

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
    <>
      <div className="flex justify-center" style={{ marginTop: -8}}>
        <img src={sampleImage} alt="Sample" className="h-full w-full" />
        <ContactModal />
      </div>
    </>
  );
}

export default MyComponent;

