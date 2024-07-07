import * as React from "react";
import sampleImage from "../../assets/backgrounddas.png"; // Đảm bảo đường dẫn đến ảnh là chính xác
import ContactModal from "../contact/ContactModal"; // Đảm bảo đường dẫn đến ContactModal là chính xác

function MyComponent() {
  return (
    <>
      <div className="flex justify-center">
        <img src={sampleImage} alt="Sample" className="h-full w-full" />
        <ContactModal />
      </div>
    </>
  );
}

export default MyComponent;
