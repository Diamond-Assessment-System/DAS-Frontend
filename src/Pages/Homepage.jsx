import React from "react";

const Homepage = () => {
  return (
    <div className="h-full w-full shadow-card p-4 rounded-lg overflow-auto hide-scrollbar bg-white">
<<<<<<< Updated upstream
      <div className="grid grid-cols-4 gap-4">
=======
      {/* <div className="grid grid-cols-4 gap-4">
>>>>>>> Stashed changes
        {new Array(4).fill({}).map((item, index) => (
          <div
            key={index}
            className="grid  grid-cols-3 gap-2 shadow-card rounded-[20px] bg-white p-4"
          >
            <div className="col-span-1 flex items-center">
              <img
                className="object-contain w-full"
                src="icons/home1.svg"
                alt="img"
              />
            </div>
            <div className="col-span-2 text-[#707070] text-bold">
              <div className="">Tổng số người dùng</div>
              <div className=" text-blue_dark text-[40px]">100</div>
              <div className="text-medium text-[18px]">
                <span className="text-[600] text-[#40C79A] mr-1">10+</span>
                Người trong tháng này
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <img
          className="shadow-card rounded-xl"
          src="/images/table.jpg"
          alt="img"
        />
        <img
          className="shadow-card rounded-xl"
          src="/images/table.jpg"
          alt="img"
        />
        <img
          className="shadow-card rounded-xl"
          src="/images/table.jpg"
          alt="img"
        />
        <img
          className="shadow-card rounded-xl"
          src="/images/table.jpg"
          alt="img"
        />
<<<<<<< Updated upstream
      </div>
=======
      </div> */}
>>>>>>> Stashed changes
    </div>
  );
};

export default Homepage;
