import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { socket } from "@/lib/socketConnection";
import { useSelectedUser } from "./SelectedUserProvider";
import type { User } from "@/types/user.types";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function UsersList() {
  const { setSelectedUser } = useSelectedUser();
  const navigate = useNavigate();

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    navigate("/chat");
  }

  const { data } = useGetAllUsers();
  if (!data) return <div>Carregando...</div>

  return (
    <div
      className="overflow-y-auto flex-1 p-4 space-y-6"
    >

      {data.users.map(user => (
        <span
          onClick={() => handleUserClick(user)}
          key={user.id}
          className="flex pl-4 space-x-4 items-center select-none hover:backdrop-brightness-150 rounded-md"
        >
          <Avatar>
            <AvatarImage src={`${apiUrl}${user.avatarPath}`} />
            <AvatarFallback
              className="capitalize"
            >{user.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p key={user.id}>{user.username}</p>
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-700 rounded-full" />
              <p>Offline</p>
            </div>
          </div>
        </span>
      ))}
    </div>
  )
}
