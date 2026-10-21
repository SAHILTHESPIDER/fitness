export function flattenFood(data) {
  const food = data?.categories?.food || {};
  const rows = [];
  for (const category of ["veg", "nonveg", "protein"]) {
    for (const item of food[category] || []) {
      rows.push({
        id: item.id,
        name: item.name,
        calories: Number(item.calories) || 0,
        image: item.image || "",
        quantity: item.quantity || "",
        category,
      });
    }
  }
  return rows;
}

export function filterFoods(items, type, query) {
  const base = !type || type === "all" ? items : items.filter((item) => item.category === type);
  const needle = String(query || "").trim().toLowerCase();
  if (!needle) return base;
  return base.filter((item) => item.name.toLowerCase().includes(needle));
}
