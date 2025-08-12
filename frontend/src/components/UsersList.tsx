import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const apiUrl = import.meta.env.VITE_API_URL;

export function UsersList() {

  const { data } = useGetAllUsers();

  console.log(data)

  if (!data) return <div>Carregando...</div>

  return (
    <div
      className="overflow-y-auto flex-1 p-4 space-y-6"
    >

      {data.users.map(user => (
        <span
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
            <span className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-700 rounded-full"/>
              <p>Offline</p>
            </span>
          </div>
        </span>
      ))}
    </div>
  )
}
