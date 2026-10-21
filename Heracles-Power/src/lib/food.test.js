import test from "node:test";
import assert from "node:assert/strict";
import { filterFoods } from "./food.js";

test("the filter uses the type that was clicked", () => {
  const items = [
    { name: "Dal Tadka", category: "veg" },
    { name: "Paneer", category: "protein" },
    { name: "Grilled Fish", category: "nonveg" },
  ];
  assert.deepEqual(filterFoods(items, "protein", "").map((item) => item.name), ["Paneer"]);
  assert.deepEqual(filterFoods(items, "veg", "dal").map((item) => item.name), ["Dal Tadka"]);
  assert.equal(filterFoods(items, "all", "").length, 3);
});
