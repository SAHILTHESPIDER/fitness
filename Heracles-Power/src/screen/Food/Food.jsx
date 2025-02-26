import React, { useState } from "react";
import foodData from "./food.json"; // Import your JSON file
import { FaDeleteLeft } from "react-icons/fa6";

export default function Food() {
  const [showCheckbox, setCheckbox] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([...foodData.categories.food.veg, ...foodData.categories.food.nonveg]);
  const [cart, setCart] = useState([]); // State to track items in the cart
  
  const handleFilterToggle = () => {
    setCheckbox(!showCheckbox);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    let items = [];
    if (type === "veg") {
      items = foodData.categories.food.veg;
    } else if (type === "nonveg") {
      items = foodData.categories.food.nonveg;
    } else {
      items = [...foodData.categories.food.veg, ...foodData.categories.food.nonveg];
    }

    // Apply search filter as well
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

    // Apply search logic
    let items = [...foodData.categories.food.veg, ...foodData.categories.food.nonveg];
    if (filterType === "veg") {
      items = foodData.categories.food.veg;
    } else if (filterType === "nonveg") {
      items = foodData.categories.food.nonveg;
    }

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const calculateTotalCalories = () => {
    return cart.reduce((total, item) => total + item.calories, 0);
    
      
  };
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };
  return (
    <div>
      {/* Filter and Search Section */}
      <div className="flex justify-center md:justify-end items-center  p-4 mt-[4%]">
        <div className="flex space-x-4">
          <input
            type="text"
            className="text-lg bg-white w-64 border-2 py-2 px-3 rounded-lg border-slate-600"
            placeholder="Enter the food"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn" onClick={handleFilterToggle}>
            Filter
          </button>
          {showCheckbox && (
            <div className="flex space-x-4 items-center">
              <label>
                <input
                  type="radio"
                  name="filter"
                  className="mr-2"
                  onChange={() => handleFilter("veg")}
                  checked={filterType === "veg"}
                />
                Veg
              </label>
              <label>
                <input
                  type="radio"
                  name="filter"
                  className="mr-2"
                  onChange={() => handleFilter("nonveg")}
                  checked={filterType === "nonveg"}
                />
                Non-Veg
              </label>
              <label>
                <input
                  type="radio"
                  name="filter"
                  className="mr-2"
                  onChange={() => handleFilter("all")}
                  checked={filterType === "all"}
                />
                All
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex">
        {/* Food Cards Section */}
        <div className="w-3/4 h-full">
          <div className="flex flex-wrap justify-center mt-5">
            {filteredItems.map((item) => (
              <div key={item.id} className="card md:w-[20%] shadow-xl m-4">
                <figure className="px-10 pt-10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-xl h-48 w-48 object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title font-bold">{item.name}</h2>
                  <p>{item.calories} Calories</p>
                  <div className="card-actions justify-end mt-2">
                    <button
                      className="btn btn-primary capitalize"
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

        {/* Cart Summary Section */}
        <div className="w-1/4 h-full bg-gray-100 p-4  shadow-md">
          <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in the cart.</p>
          ) : (
            <>
              <ul className="mb-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.calories} cal</span>
                    <span className="text-[1rem] btn" onClick={() => removeFromCart(index)}><FaDeleteLeft /></span>
                  </li>
                ))}
              </ul>
              <div className="text-xl font-semibold">
                Total Calories: {calculateTotalCalories()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
