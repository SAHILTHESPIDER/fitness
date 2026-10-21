import { useEffect, useMemo, useState } from "react";
import api from "./api";
import AuthContext from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("hp-token");
    if (!token) {
      setReady(true);
      return undefined;
    }
    let gone = false;
    api.get("/auth/me")
      .then((res) => {
        if (!gone) setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("hp-token");
      })
      .finally(() => {
        if (!gone) setReady(true);
      });
    return () => {
      gone = true;
    };
  }, []);

  useEffect(() => {
    const onLogout = () => setUser(null);
    window.addEventListener("hp-logout", onLogout);
    return () => window.removeEventListener("hp-logout", onLogout);
  }, []);

  const value = useMemo(() => ({
    user,
    ready,
    async login(email, password) {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("hp-token", res.data.token);
      setUser(res.data.user);
      return res.data.user;
    },
    async signup(body) {
      const res = await api.post("/auth/signup", body);
      localStorage.setItem("hp-token", res.data.token);
      setUser(res.data.user);
      return res.data.user;
    },
    logout() {
      localStorage.removeItem("hp-token");
      setUser(null);
    },
    updateUser(next) {
      setUser(next);
    },
  }), [user, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

