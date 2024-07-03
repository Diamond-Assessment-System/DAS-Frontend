import React, { useState } from "react";
import "./SealingRecords.css"; // Assuming some custom styles are needed

const SealingRecords = () => {
  const [diamonds, setDiamonds] = useState([
    { id: 1, name: "Diamond 1", sealed: false },
    { id: 2, name: "Diamond 2", sealed: false },
    { id: 3, name: "Diamond 3", sealed: false },
  ]);

  const toggleSeal = (id) => {
    setDiamonds((prevDiamonds) =>
      prevDiamonds.map((diamond) =>
        diamond.id === id ? { ...diamond, sealed: !diamond.sealed } : diamond
      )
    );
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Create Sealing Records
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">
                  Diamond Name
                </th>
                <th className="py-4 px-4 text-center align-middle">
                  Seal Status
                </th>
                <th className="py-4 px-4 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {diamonds.map((diamond) => (
                <tr key={diamond.id}>
                  <td className="py-4 px-4 text-center align-middle">
                    {diamond.name}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {diamond.sealed ? "Sealed" : "Unsealed"}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        diamond.sealed
                          ? "bg-red-500 hover:bg-red-700"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                      onClick={() => toggleSeal(diamond.id)}
                    >
                      {diamond.sealed ? "Unseal" : "Seal"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SealingRecords;
