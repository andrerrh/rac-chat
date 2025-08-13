import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useSelectedUser } from "@/components/SelectedUserProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketConnection";

const apiUrl = import.meta.env.VITE_API_URL;

interface AnswerReceived {
  username: string;
  message: string;
}

export function ChatPage() {
  const [message, setMessage] = useState(""); //Mensagem a ser enviada
  const [messages, setMessages] = useState<Array<AnswerReceived>>([]); //Mensagens no display
  const [room, setRoom] = useState("");

  const { selectedUser } = useSelectedUser();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    let id1 = userId;
    let id2 = selectedUser?.id;

    if (id1 && id2) {
      const [low, high] = [id1, id2].sort((a, b) => Number(a) - Number(b));
      const roomId = `${low}_${high}`;
      socket.emit('join_room', roomId);
      setRoom(roomId);
    }
  }, [selectedUser, socket])

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (!message.trim() || !room) return;
    socket.emit('send_message', { userId, username, message, room });
    setMessage("");
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    })

    return () => {
      socket.off('receive_message');
    }
  }, [])


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
        >
          <ul>
            {messages && messages.map((msg) => (
              <li>{msg.message}</li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={handleMessageSubmit}
          className={`
            flex
            w-[90%]
            xl:w-[50%]
            space-x-4`}
        >
          <Input
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="text-white !rounded-full"
          >
            <SendHorizonal />
          </Button>
        </form>
      </div>
    </>
  )
}
