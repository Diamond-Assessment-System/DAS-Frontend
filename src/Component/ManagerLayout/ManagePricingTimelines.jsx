import React, { useState } from "react";
import "../ManagerLayout/ManagePricingTimeline.css";

const ManageOrderTimelines = () => {
  const [services] = useState([
    {
      id: 1,
      type: "Diamond Assessment",
      price: "$100",
      timeline: "3 days",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam tincidunt justo ut imperdiet.",
    },
    {
      id: 2,
      type: "Gemstone Assessment",
      price: "$80",
      timeline: "2 days",
      details:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
    {
      id: 3,
      type: "Jewelry Assessment",
      price: "$120",
      timeline: "4 days",
      details:
        "Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    },
  ]);

  const viewDetails = (id) => {
    const service = services.find((service) => service.id === id);
    if (service) {
      alert(`Details for ${service.type}: ${service.details}`);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Manage Assessment Services
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">ID</th>
                <th className="py-4 px-4 text-center align-middle">
                  Service Type
                </th>
                <th className="py-4 px-4 text-center align-middle">Price</th>
                <th className="py-4 px-4 text-center align-middle">Timeline</th>
                <th className="py-4 px-4 text-center align-middle">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.id}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.type}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.price}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.timeline}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => viewDetails(service.id)}
                    >
                      View Details
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

export default ManageOrderTimelines;
