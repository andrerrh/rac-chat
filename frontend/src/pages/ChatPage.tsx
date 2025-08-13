import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useSelectedUser } from "@/components/SelectedUserProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const apiUrl = import.meta.env.VITE_API_URL;

export function ChatPage() {
  const { selectedUser } = useSelectedUser();
  console.log(selectedUser)

  return (
    <>
      <div
        className="flex flex-col pb-4 justify-end w-full items-center space"
        id="chat-page-container"
      >
        <div
          className="flex items-center w-[90%] h-15 bg-zinc-900 rounded-md mt-5 mb-2 px-2 space-x-3"
          id="chat-user"
        >
          <Avatar
            className="w-10 h-10"
          >
            <AvatarImage
              src={`${apiUrl}${selectedUser?.avatarPath}`}
            >
            </AvatarImage>
            <AvatarFallback className="capitalize">{selectedUser?.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p>{selectedUser?.username}</p>
            <span className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-700 rounded-full" />
              <p>Offline</p>
            </span>
          </div>
        </div>
        <div
          className="flex flex-col w-[90%] h-full bg-zinc-900 rounded-md mb-5"
          id="chat-display"
        ></div>
        <div
          className={`
            flex
            w-[90%]
            xl:w-[50%]
            space-x-4`}
        >
          <Input />
          <Button
            className="text-white !rounded-full"
          >
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </>
  )
}
