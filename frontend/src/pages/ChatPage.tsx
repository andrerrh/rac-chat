import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Smile } from "lucide-react";
import { useSelectedUser } from "@/components/SelectedUserProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/components/message";
import type { HistoryMessagesProps, ReceiveMessageProps } from "@/types/message.types";
import { useSocket } from "@/components/SocketProvider";
import { useOnlineUsers } from "@/components/OnlineUsersProvider";
import { CustomEmojiPicker } from "@/components/CustomEmojiPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const apiUrl = import.meta.env.VITE_API_URL;

export function ChatPage() {
  const [message, setMessage] = useState(""); //Mensagem a ser enviada
  const [messages, setMessages] = useState<Array<ReceiveMessageProps>>([]); //Mensagens no display
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [room, setRoom] = useState("");

  const { selectedUser } = useSelectedUser();
  const { onlineUsers } = useOnlineUsers();
  const { socket } = useSocket();

  //Conecta-se ao chat correto atraves do id do usuario logado e do selecionado
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    let id1 = userId;
    let id2 = selectedUser?.id;

    if (id1 && id2) {
      const [low, high] = [id1, id2].sort((a, b) => Number(a) - Number(b));
      const roomId = `${low}_${high}`;
      socket?.emit('join_room', roomId);
      setRoom(roomId);
    }
  }, [selectedUser, socket])

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (!message.trim() || !room) return;
    socket?.emit('send_message', {
      userId,
      receiverId: selectedUser?.id,
      username,
      message,
      room
    });
    setMessage("");
  }

  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socket?.on('message_history', (oldMessages: HistoryMessagesProps[]) => {
      const arr: ReceiveMessageProps[] = [];
      oldMessages.forEach(curr => {
        arr.push({
          date: curr.createdAt,
          username: curr.sender.username,
          userId: String(curr.sender.id),
          message: curr.message,
        })
      })
      setMessages(arr)
    })

    socket?.on('receive_message', (data: ReceiveMessageProps) => {
      setMessages(prev => [...prev, data]);
    })

    //Informação de que o usuario está digitando
    socket?.on('contact_typing', () => {
      setIsTyping(true);

      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => setIsTyping(false), 2000);
    })

    return () => {
      socket?.off('message_history');
      socket?.off('receive_message');
      socket?.off('contact_typing');
    }
  }, [])

  const handleMessageTyping = (text: string) => {
    socket?.emit("typing", room)
    setMessage(text);
  }


  return (
    <>
      <div
        className="flex flex-col pb-4 h-screen justify-between w-full items-center space"
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
              <div
                className={`w-2 h-2 rounded-full ${onlineUsers.has(String(selectedUser?.id) ?? "") ? "bg-green-500" : "bg-gray-700"
                  }`}
              />
              <p>
                {onlineUsers.has(String(selectedUser?.id) ?? "") ? "Online" : "Offline"}
              </p>
            </span>

          </div>
        </div>
        <div
          className="flex flex-col w-[90%] h-full bg-zinc-900 rounded-md mb-5 p-5 overflow-y-auto"
          id="chat-display"
        >
          <ul>
            {messages && messages.map((msg, i) => (
              <li key={`${msg.username} + ${i}`} className="mb-2">
                <Message
                  message={msg.message}
                  username={msg.username}
                  isSender={msg.userId == localStorage.getItem("user_id")}
                  date={new Date(msg.date)}
                />
              </li>
            ))}
          </ul>
          {isTyping &&
            <p>Digitando...</p>
          }
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
            onChange={(e) => handleMessageTyping(e.target.value)}
          />
          <Popover>
            <PopoverTrigger
              className="!rounded-full w-14 h-9 flex justify-center items-center"
            >
              <Smile />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-fit"
            >
              <CustomEmojiPicker setMessage={setMessage} />
            </PopoverContent>
          </Popover>
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
