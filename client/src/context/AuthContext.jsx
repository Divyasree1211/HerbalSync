import { useCallback, useEffect, useMemo, useState } from "react";
import { getProfile, loginUser, registerUser } from "../services/authService";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrateUser() {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (localStorage.getItem("token")) {
        try {
          const profile = await getProfile();
          const nextUser = profile.user || profile;
          setUser(nextUser);
          localStorage.setItem("user", JSON.stringify(nextUser));
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    }

    hydrateUser();
  }, []);

  const persistSession = useCallback((payload) => {
    const nextToken = payload.token;
    const nextUser = payload.user || payload;

    if (nextToken) {
      localStorage.setItem("token", nextToken);
      setToken(nextToken);
    }

    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const login = useCallback(async (credentials) => {
    const payload = await loginUser(credentials);
    return persistSession(payload);
  }, [persistSession]);

  const register = useCallback(async (formData) => {
    const payload = await registerUser(formData);
    return persistSession(payload);
  }, [persistSession]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const updateUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, loading, login, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
