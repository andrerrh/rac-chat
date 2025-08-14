import React, { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
const apiUrl = import.meta.env.VITE_API_URL;

interface SocketContextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if(!userId) return;

    const s = io(apiUrl);
    s.emit("online", userId);
    setSocket(s);


    return () => {
      s.disconnect();
      setSocket(null);
    }
  }, [userId])

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error("Sem contexto para SocketProvider");
  return context;
}

