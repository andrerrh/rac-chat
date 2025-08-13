import React, { createContext, useContext, useState } from "react";
import type { User } from '../types/user.types';

interface SelectedUserContextType {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface SelectedUserProviderProps {
  children: React.ReactNode;
}

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined);

export function SelectedUserProvider({ children }: SelectedUserProviderProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  )
}

export function useSelectedUser(): SelectedUserContextType {
  const context = useContext(SelectedUserContext);
  if(!context) {
    throw new Error("Sem contexto para SelectedUserProvider");
  }

  return context;
}
