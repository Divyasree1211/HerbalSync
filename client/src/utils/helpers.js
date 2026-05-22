export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function normalizeList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getInitials(name = "HS") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const dailyGoals = {
  calories: 2000,
  protein: 70,
  water: 3,
};

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyTotals(logs, dayKey = getTodayKey()) {
  return logs
    .filter((log) => (log.date || "").slice(0, 10) === dayKey)
    .reduce(
      (sum, log) => ({
        calories: sum.calories + Number(log.calories || 0),
        protein: sum.protein + Number(log.protein || 0),
        water: sum.water + Number(log.waterIntake || 0),
      }),
      { calories: 0, protein: 0, water: 0 }
    );
}

export function getGoalPercent(value, goal) {
  if (!goal) return 0;
  return Math.min(100, Math.round((Number(value || 0) / goal) * 100));
}

export function getLastSevenDayTotals(logs) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      label: formatDate(date),
      calories: 0,
      protein: 0,
      water: 0,
    };
  });

  logs.forEach((log) => {
    const day = days.find((item) => item.key === (log.date || "").slice(0, 10));
    if (day) {
      day.calories += Number(log.calories || 0);
      day.protein += Number(log.protein || 0);
      day.water += Number(log.waterIntake || 0);
    }
  });

  return days;
}
