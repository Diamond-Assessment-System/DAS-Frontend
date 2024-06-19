import React, { useState } from "react";
import "../ManagerLayout/SealingRecords.css";
const SealingRecords = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Order 1", sealed: false },
    { id: 2, name: "Order 2", sealed: false },
    { id: 3, name: "Order 3", sealed: false },
  ]);

  const toggleSeal = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, sealed: !order.sealed } : order
      )
    );
  };

  const handleSave = () => {
    // Logic to save sealing records
    console.log("Orders:", orders);
  };

  return (
    <div>
      <h1>Sealing Records</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => toggleSeal(order.id)}
                  disabled={order.sealed}
                  style={{
                    marginRight: "10px",
                    opacity: order.sealed ? 0.5 : 1,
                  }}
                >
                  Seal
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => toggleSeal(order.id)}
                  disabled={!order.sealed}
                  style={{ opacity: !order.sealed ? 0.5 : 1 }}
                >
                  Unseal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sealing" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SealingRecords;
