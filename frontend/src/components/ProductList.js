import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownCard from "./DropdownCard";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="relative p-5 flex flex-col">
              <div className="rounded-xl overflow-hidden">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75%" }}
                >
                  <img
                    src={product.url}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <DropdownCard
                    productId={product.id}
                    getProducts={getProducts}
                  />
                </div>
              </div>
              <h5 className="text-2xl md-text-3xl font-medium mt-3">
                {product.name}
              </h5>
              <p className="text-slate-500 text-lg mt-3">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
