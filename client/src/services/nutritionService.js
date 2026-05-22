import api from "../utils/api";

const STORAGE_KEY = "herbalsync_nutrition_logs";

export function getLocalNutritionLogs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveLocalNutritionLog(log) {
  const logs = getLocalNutritionLogs();
  const nextLog = {
    ...log,
    _id: crypto.randomUUID(),
    date: log.date || new Date().toISOString(),
  };
  const nextLogs = [nextLog, ...logs].slice(0, 30);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLogs));
  return nextLog;
}

export async function createNutritionLog(log) {
  try {
    const { data } = await api.post("/nutrition", log);
    return data.log || data;
  } catch {
    return saveLocalNutritionLog(log);
  }
}

export async function getNutritionHistory() {
  try {
    const { data } = await api.get("/nutrition/history");
    return Array.isArray(data) ? data : data.logs || [];
  } catch {
    return getLocalNutritionLogs();
  }
}
