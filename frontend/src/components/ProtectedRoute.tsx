import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function ProtectedRoute() {
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }

    fetch(`${apiUrl}/auth/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => setIsValid(data.valid))
      .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) return <div>Carregando...</div>;
  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

