import React, { useState, useRef, useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Food() {
  const [foodData, setFoodData] = useState(null);
  const [showCheckbox, setCheckbox] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const cartRef = useRef(null);

  // ✅ Load food data safely from public folder
  useEffect(() => {
    fetch("/Food.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Food.json");
        return res.json();
      })
      .then((data) => {
        setFoodData(data);
        setFilteredItems([
          ...data.categories.food.veg,
          ...data.categories.food.nonveg,
          ...(data.categories.food.protein || []),
        ]);
      })
      .catch((err) => {
        console.error("Error loading food data:", err);
      });
  }, []);

  // ⏳ Loading guard (VERY IMPORTANT)
  if (!foodData) {
    return <div className="mt-20 text-center">Loading food data...</div>;
  }

  const proteinIds =
    foodData.categories.food.protein?.map((item) => item.id) || [];

  const handleFilterToggle = () => {
    setCheckbox(!showCheckbox);
  };

  const getBaseItems = () => {
    if (filterType === "veg") return foodData.categories.food.veg;
    if (filterType === "nonveg") return foodData.categories.food.nonveg;
    if (filterType === "protein") return foodData.categories.food.protein || [];
    return [
      ...foodData.categories.food.veg,
      ...foodData.categories.food.nonveg,
      ...(foodData.categories.food.protein || []),
    ];
  };

  const handleFilter = (type) => {
    setFilterType(type);
    let items = getBaseItems();

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

    let items = getBaseItems();
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setTimeout(() => {
      cartRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotalCalories = () =>
    cart.reduce((total, item) => total + item.calories, 0);

  return (
    <div className="p-4 pb-16 relative">
      {/* Filter & Search */}
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
                  checked={filterType === type}
                  onChange={() => handleFilter(type)}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout */}
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
                  <h2 className="card-title font-bold text-base">
                    {item.name}
                  </h2>
                  <p className="text-sm">{item.calories} Calories</p>

                  {proteinIds.includes(item.id) && item.quantity && (
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
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

        {/* Desktop Cart */}
        <div
          ref={cartRef}
          className="lg:w-1/4 w-full bg-gray-100 p-4 shadow-md rounded-lg hidden lg:block sticky top-20"
        >
          <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-600">No items in the cart.</p>
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
                      className="text-red-600"
                      onClick={() => removeFromCart(index)}
                    >
                      <FaDeleteLeft />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-lg font-semibold">
                Total: {calculateTotalCalories()} cal
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Cart Bar */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t p-3 flex justify-between items-center z-50">
          <span className="font-medium text-sm">
            Total: {calculateTotalCalories()} cal
          </span>
          <button
            className="btn btn-xs btn-primary"
            onClick={() => setShowModal(true)}
          >
            View Cart
          </button>
        </div>
      )}

      {/* Mobile Modal */}
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

            <ul className="space-y-2 text-sm">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <span>{item.name}</span>
                  <span>{item.calories} cal</span>
                  <button
                    className="text-red-600"
                    onClick={() => removeFromCart(index)}
                  >
                    <FaDeleteLeft />
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-center font-semibold mt-2">
              Total: {calculateTotalCalories()} cal
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
