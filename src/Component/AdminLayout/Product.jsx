import React from "react";
import "../AdminLayout/Product.css";
const Products = () => {
  return (
    <div className="products">
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Carat</th>
            <th>Cut</th>
            <th>Color</th>
            <th>Clarity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Diamond 1</td>
            <td>1.0</td>
            <td>Round</td>
            <td>D</td>
            <td>VVS1</td>
            <td>$5,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;
