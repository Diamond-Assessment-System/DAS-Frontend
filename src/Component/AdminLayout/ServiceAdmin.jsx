import React, { useState } from "react";
import "../AdminLayout/ServiceAdmin.css";
const ServiceAdmin = () => {
    // Dummy data for services
    const [services, setServices] = useState([
        { id: 1, name: "Service A", price: "100,000 VNĐ", description: "Description of Service A" },
        { id: 2, name: "Service B", price: "150,000 VNĐ", description: "Description of Service B" },
        // Add more services as needed
    ]);

    // State for handling form input
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: ""
    });

    // Handler for submitting the form to add a new service
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
    };

    // Handler for deleting a service
    const handleDeleteService = (id) => {
        const updatedServices = services.filter(service => service.id !== id);
        setServices(updatedServices);
    };

    // Handler for updating form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="service-admin mt-20">
            <h2>Manage Services</h2>
            <form onSubmit={handleAddService}>
                <input
                    type="text"
                    name="name"
                    placeholder="Service Name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Service</button>
            </form>
            <table className="service-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.price}</td>
                            <td>{service.description}</td>
                            <td>
                                <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceAdmin;
