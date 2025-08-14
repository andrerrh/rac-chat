import React, { createContext, useContext, useEffect, useState } from "react";
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
  
  //Persiste o usuário selecionado ao dar refresh na página
  const [selectedUser, setSelectedUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('selected_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selected_user', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selected_user');
    }
  }, [selectedUser])

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  )
}

export function useSelectedUser(): SelectedUserContextType {
  const context = useContext(SelectedUserContext);
  if (!context) throw new Error("Sem contexto para SelectedUserProvider");
  return context;
}
