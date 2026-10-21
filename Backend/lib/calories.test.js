const test = require("node:test");
const assert = require("node:assert/strict");
const { bmi, bmiCategory, calorieTarget } = require("./calories");
const { shiftDate, weekDates } = require("./dates");

test("bmi colours follow the clinical bands", () => {
  assert.equal(bmiCategory(17), "Underweight");
  assert.equal(bmiCategory(22), "Normal");
  assert.equal(bmiCategory(27), "Overweight");
  assert.equal(bmiCategory(32), "Obese");
  assert.equal(bmiCategory(Number("nope")), null);
});

test("a non-numeric weight does not invent a BMI", () => {
  assert.equal(bmi("heavy", 5, 9), null);
});

test("calorie target stays at or above 1200 and drops when cutting", () => {
  const user = {
    dob: "2000-01-01",
    gender: "male",
    weight: 90,
    heightFeet: 5,
    heightInches: 9,
    goalWeight: 75,
  };
  const cutting = calorieTarget(user, new Date("2026-10-21T00:00:00Z"));
  const maintain = calorieTarget({ ...user, goalWeight: 90 }, new Date("2026-10-21T00:00:00Z"));
  assert.ok(cutting >= 1200);
  assert.ok(cutting < maintain);
});

test("week dates stay on the calendar the client sent", () => {
  assert.equal(shiftDate("2026-03-01", -1), "2026-02-28");
  const week = weekDates("2026-10-21");
  assert.equal(week.length, 7);
  assert.equal(week[6], "2026-10-21");
  assert.equal(week[0], "2026-10-15");
});
