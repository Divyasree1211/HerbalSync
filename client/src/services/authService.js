import api from "../utils/api";

export async function registerUser(formData) {
  const { data } = await api.post("/api/auth/register", formData);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/api/auth/profile");
  return data;
}
