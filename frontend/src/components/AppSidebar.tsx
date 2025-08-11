import { useState, useEffect } from "react";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

const apiUrl = import.meta.env.VITE_API_URL;

export function AppSidebar() {
  const [user, setUser] = useState<{ username: string | null; avatar: string | null } | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    if (username) {
      setUser({ username, avatar });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader>
        {!user ?
          <></> :
          <img
            className="w-15 h-15 bg-transparent"
            src={`${apiUrl}${user.avatar}`}
          />}
        {!user ? <h2>Faça Login</h2> : <h2>{`Olá, ${user.username}`}</h2>}
      </SidebarHeader>
    </Sidebar>
  );
}

