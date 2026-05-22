import api from "../utils/api";

export async function registerUser(formData) {
  const { data } = await api.post("/auth/register", formData);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data;
}
