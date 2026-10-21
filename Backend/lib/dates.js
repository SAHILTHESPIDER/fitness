function shiftDate(iso, days) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
  if (!match) return null;
  const dt = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
  return dt.toISOString().slice(0, 10);
}

function weekDates(today) {
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const next = shiftDate(today, -i);
    if (next) days.push(next);
  }
  return days;
}

function isDateKey(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) && shiftDate(value, 0) === value;
}

module.exports = { shiftDate, weekDates, isDateKey };
