function ageFromDob(dob, now = new Date()) {
  const born = new Date(dob);
  if (Number.isNaN(born.getTime())) return null;
  let age = now.getFullYear() - born.getFullYear();
  const month = now.getMonth() - born.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < born.getDate())) age -= 1;
  return age;
}

function heightCm(feet, inches) {
  const f = Number(feet);
  const i = Number(inches);
  if (!Number.isFinite(f) || !Number.isFinite(i)) return null;
  return f * 30.48 + i * 2.54;
}

function bmi(weightKg, feet, inches) {
  const kg = Number(weightKg);
  const cm = heightCm(feet, inches);
  if (!Number.isFinite(kg) || kg <= 0 || !Number.isFinite(cm) || cm <= 0) return null;
  const metres = cm / 100;
  return Math.round((kg / (metres * metres)) * 10) / 10;
}

function bmiCategory(value) {
  if (!Number.isFinite(value)) return null;
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal";
  if (value < 30) return "Overweight";
  return "Obese";
}

function calorieTarget(user, now = new Date()) {
  const age = ageFromDob(user.dob, now);
  const kg = Number(user.weight);
  const cm = heightCm(user.heightFeet, user.heightInches);
  if (!Number.isFinite(age) || age < 10 || !Number.isFinite(kg) || !Number.isFinite(cm) || cm <= 0) return null;
  const sex = user.gender === "male" ? 5 : -161;
  const bmr = 10 * kg + 6.25 * cm - 5 * age + sex;
  let tdee = bmr * 1.375;
  const goal = Number(user.goalWeight);
  if (Number.isFinite(goal)) {
    if (kg - goal > 1) tdee -= 400;
    else if (goal - kg > 1) tdee += 300;
  }
  return Math.max(1200, Math.round(tdee));
}

module.exports = { ageFromDob, heightCm, bmi, bmiCategory, calorieTarget };
