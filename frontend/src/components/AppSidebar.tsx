import { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { DoorClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UsersList } from "./UsersList";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Navigation } from "./Navigation";

const apiUrl = import.meta.env.VITE_API_URL;

type User = {
  id: string | null;
  username: string | null;
  avatar: string | null;
};

interface AppSidebarProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function AppSidebar({ user, setUser }: AppSidebarProps) {

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    if (username) {
      setUser({id: userId, username, avatar });
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
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
          <Navigation />
          :
          <div className="space-y-4 flex flex-col items-center">
            <Avatar
              className="w-15 h-15"
            >
              <AvatarImage
                src={`${apiUrl}${user.avatar}`}
              />
              <AvatarFallback className="capitalize">
                {user.username?.substring(0, 2)}
              </AvatarFallback>

            </Avatar>
            <h2>{`Olá, ${user.username}!`}</h2>
          </div>
        }
      </SidebarHeader>
      <SidebarContent >
        {user &&
          <>
            <UsersList loggedUsername={user.username} />
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
      </SidebarContent>
    </Sidebar>
  );
}

