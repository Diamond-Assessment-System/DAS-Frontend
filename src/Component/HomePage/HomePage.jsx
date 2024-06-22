import * as React from "react";
import sampleImage from "../../assets/backgrounddas.png"; // Đảm bảo đường dẫn đến ảnh là chính xác

function MyComponent() {
  return (
    <>
      <div className="flex justify-center ">
        <img src={sampleImage} alt="Sample" className="h-full w-full" />
      </div>
    </>
  );
}

export default MyComponent;
