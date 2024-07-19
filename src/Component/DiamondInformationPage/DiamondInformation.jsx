import * as React from "react";
import Aquamarine from "../../assets/Aquamarine.jpg";
import SanHo from '../../assets/San-ho.jpg';
import Zircon from '../../assets/Zircon.jpg';
import Tanzanite from '../../assets/Tanzanite.jpg';
import { Link } from 'react-router-dom';
import './DiamondInformation.css'; // Import CSS file for styling

function DiamondInformation() {
  const [hoveredImage, setHoveredImage] = React.useState(null);

  return (
    <div className="flex flex-col bg-white min-h-screen ">
      <div className="flex flex-col mt-28 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {[{ image: Aquamarine, name: "Aquamarine" }, { image: SanHo, name: "SanHo" }, { image: Zircon, name: "Zircon" }, { image: Tanzanite, name: "Tanzanite" }].map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center"
          >
            <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
              <Link
                to={`/diamonds/${item.name.toLowerCase()}`}
                className="w-full max-w-sm"
              >
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
              </Link>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className={`text-3xl font-bold ${hoveredImage === item.image ? "text-yellow-500" : ""}`}>{item.name}</h2>
              <p className="text-lg text-yellow-600 mt-4">Mô Tả</p>
              <Link to={`/diamonds/${item.name.toLowerCase()}`}>
                <button className="mt-8 py-3 px-6 bg-amber-300 text-black font-semibold rounded-md shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2">
                  Xem Chi Tiết
                </button>
              </Link>
            </div>
          </div>
        ))}
        <br /> <br />
      </div>
    </div>
  );
}

export default DiamondInformation;
