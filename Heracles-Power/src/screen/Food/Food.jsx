import React, { useState, useRef } from "react";
import foodData from "./food.json";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Food() {
  const [showCheckbox, setCheckbox] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([
    ...foodData.categories.food.veg,
    ...foodData.categories.food.nonveg,
    ...(foodData.categories.food.protein || []),
  ]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const cartRef = useRef(null);

  const proteinIds = foodData.categories.food.protein?.map((item) => item.id) || [];

  const handleFilterToggle = () => {
    setCheckbox(!showCheckbox);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    let items = [];
    if (type === "veg") items = foodData.categories.food.veg;
    else if (type === "nonveg") items = foodData.categories.food.nonveg;
    else if (type === "protein") items = foodData.categories.food.protein;
    else
      items = [
        ...foodData.categories.food.veg,
        ...foodData.categories.food.nonveg,
        ...(foodData.categories.food.protein || []),
      ];

    if (searchQuery) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(items);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    let items = [];
    if (filterType === "veg") items = foodData.categories.food.veg;
    else if (filterType === "nonveg") items = foodData.categories.food.nonveg;
    else if (filterType === "protein") items = foodData.categories.food.protein;
    else
      items = [
        ...foodData.categories.food.veg,
        ...foodData.categories.food.nonveg,
        ...(foodData.categories.food.protein || []),
      ];

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotalCalories = () =>
    cart.reduce((total, item) => total + item.calories, 0);

  return (
    <div className="p-4 pb-16 relative">
      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row md:justify-end items-center gap-4 mb-4 mt-16">
        <input
          type="text"
          className="text-lg w-full md:w-64 bg-white border-2 py-2 px-3 rounded-lg border-slate-600"
          placeholder="Enter the food"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn" onClick={handleFilterToggle}>
          Filter
        </button>
        {showCheckbox && (
          <div className="flex flex-wrap gap-4">
            {["veg", "nonveg", "protein", "all"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="filter"
                  className="mr-2"
                  onChange={() => handleFilter(type)}
                  checked={filterType === type}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Food Cards */}
        <div className="lg:w-3/4 w-full">
          <div className="flex flex-wrap justify-center">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="card w-full sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-xl m-2"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title font-bold text-base">{item.name}</h2>
                  <p className="text-sm">{item.calories} Calories</p>
                  {proteinIds.includes(item.id) && item.quantity && (
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  )}
                  <div className="card-actions justify-center mt-2">
                    <button
                      className="btn btn-primary btn-sm capitalize"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Cart Summary */}
        <div
          ref={cartRef}
          className="lg:w-1/4 w-full bg-gray-100 p-4 shadow-md rounded-lg hidden lg:block sticky top-20"
        >
          <h2 className="text-xl font-bold mb-4 text-center lg:text-left">
            Cart Summary
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">No items in the cart.</p>
          ) : (
            <>
              <ul className="mb-4 space-y-2 text-sm">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-1"
                  >
                    <span className="truncate">{item.name}</span>
                    <span>{item.calories} cal</span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => removeFromCart(index)}
                    >
                      <FaDeleteLeft />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-lg font-semibold text-center lg:text-left">
                Total: {calculateTotalCalories()} cal
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky Mobile Cart Summary */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t p-3 flex justify-between items-center z-50">
          <span className="font-medium text-sm">
            Total: {calculateTotalCalories()} cal
          </span>
          <button className="btn btn-xs btn-primary" onClick={() => setShowModal(true)}>
            View Cart
          </button>
        </div>
      )}

      {/* Modal Cart View for Mobile */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-white w-full max-h-[70vh] overflow-y-auto rounded-t-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Cart Summary</h2>
              <button
                className="text-red-600 font-bold text-xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-center text-gray-600">No items in the cart.</p>
            ) : (
              <>
                <ul className="mb-4 space-y-2 text-sm">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-1"
                    >
                      <span className="truncate">{item.name}</span>
                      <span>{item.calories} cal</span>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeFromCart(index)}
                      >
                        <FaDeleteLeft />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="text-center font-semibold">
                  Total: {calculateTotalCalories()} cal
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
