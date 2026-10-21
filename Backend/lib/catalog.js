const food = require("../data/food.json");
const exercises = require("../data/exercises.json");

function foodCatalog() {
  const groups = food.categories.food;
  const rows = [];
  for (const category of Object.keys(groups)) {
    for (const item of groups[category]) {
      rows.push({
        id: item.id,
        name: item.name,
        calories: Number(item.calories) || 0,
        category,
        diet: category === "nonveg" ? "nonveg" : "veg",
        quantity: item.quantity || "",
      });
    }
  }
  return rows;
}

function exerciseCatalog() {
  return exercises.exercises;
}

module.exports = { foodCatalog, exerciseCatalog };
