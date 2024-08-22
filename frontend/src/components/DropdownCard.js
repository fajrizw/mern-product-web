import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const DropdownCard = ({ productId, getProducts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="flex justify-end px-4 pt-4">
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        className="inline-block rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 mt-10 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-inset ring-gray-300 ring-opacity-50 font-semibold"
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <Link to={`edit/${productId}`}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </a>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Detail
              </a>
            </li>
            <li>
              <a
                onClick={deleteProduct}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCard;
