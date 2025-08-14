import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

interface OnlineUsersContextType {
  onlineUsers: Set<string>;
}

const OnlineUsersContext = createContext<OnlineUsersContextType | undefined>(undefined);

export function OnlineUsersProvider({ children }: { children: React.ReactNode }) {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  const { socket } = useSocket();

  useEffect(() => {
    const handleInitialList = (list: string[]) => setOnlineUsers(new Set(list));
    const handleOnline = (id: string) => setOnlineUsers(prev => new Set(prev).add(id));
    const handleOffline = (id: string) => setOnlineUsers(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });

    socket?.on("user_online", handleOnline);
    socket?.on("user_offline", handleOffline);
    socket?.on("online_users_list", handleInitialList);

    return () => {
      socket?.off("user_online", handleOnline);
      socket?.off("user_offline", handleOffline);
    };
  }, [socket]);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
}

export function useOnlineUsers() {
  const context = useContext(OnlineUsersContext);
  if (!context) throw new Error("Sem contexto para SelectedUserProvider");
  return context;
}
