import React, { useState } from "react";
import "../AdminLayout/ServiceAdmin.css";

const ServiceAdmin = () => {
    const [services, setServices] = useState([
        { id: 1, name: "Service A", price: "100,000 VNĐ", description: "Description of Service A" },
        { id: 2, name: "Service B", price: "150,000 VNĐ", description: "Description of Service B" },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddService = (e) => {
        e.preventDefault();
        const newService = {
            id: services.length + 1,
            name: formData.name,
            price: formData.price,
            description: formData.description
        };
        setServices([...services, newService]);
        setFormData({ name: "", price: "", description: "" });
        setIsModalOpen(false);
    };

    const handleDeleteService = (id) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Manage Services</h4>
                <button
                    onClick={toggleModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                    Add Service
                </button>
                {isModalOpen && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-8">
                            <h5 className="text-lg font-semibold mb-4">Add New Service</h5>
                            <form onSubmit={handleAddService}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Service Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Add Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-4 px-4 text-center align-middle">ID</th>
                                <th className="py-4 px-4 text-center align-middle">Name</th>
                                <th className="py-4 px-4 text-center align-middle">Price</th>
                                <th className="py-4 px-4 text-center align-middle">Description</th>
                                <th className="py-4 px-4 text-center align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td className="py-4 px-4 text-center align-middle">{service.id}</td>
                                    <td className="py-4 px-4 text-center align-middle">{service.name}</td>
                                    <td className="py-4 px-4 text-center align-middle">{service.price}</td>
                                    <td className="py-4 px-4 text-center align-middle">{service.description}</td>
                                    <td className="py-4 px-4 text-center align-middle">
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Delete
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

export default ServiceAdmin;
