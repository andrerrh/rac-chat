import { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { DoorClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

type User = {
  username: string | null;
  avatar: string | null;
};

interface AppSidebarProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function AppSidebar({user, setUser}: AppSidebarProps) {
  
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    if (username) {
      setUser({ username, avatar });
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login", {replace: true});
    setUser(null);
  }

  return (
    <Sidebar
      side="left"
      collapsible="offcanvas"
      className="h-screen flex flex-col"
    >
      <SidebarHeader
        className="flex items-center pt-8"
      >
        {!user ?
          <h2>Faça Login</h2>
          :
          <div className="space-y-4 flex flex-col items-center">
            <img
              className="w-12 h-12 bg-transparent rounded-full"
              src={`${apiUrl}${user.avatar}`}
            />
            <h2>{`Olá, ${user.username}!`}</h2>
          </div>
        }
      </SidebarHeader>
      {user &&
        <>
          <SidebarContent className="overflow-y-auto flex-1 p-4 space-y-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <h2 key={i}>teste {i + 1}</h2>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              onClick={logout}
              className="text-white hover:text-red-600 hover:!border-red-600 !transition duration-200"
            >
              Sair
              <DoorClosed />
            </Button>
          </SidebarFooter>
        </>
      }
    </Sidebar>
  );
}

