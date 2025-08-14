import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface MessageProps {
  message: string;
  username: string;
  isSender: boolean;
  date: Date;
}

export function Message({ message, username, isSender, date }: MessageProps) {
  const [displayDate, setDisplayDate] = useState<string>("");

  useEffect(() => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    setDisplayDate(`${hours}:${minutes}:${seconds} | ${day}/${month}/${year}`);
  }, [])

  return (
    <div
      className={`
        flex
        flex-col
        ${isSender ? "items-end ml-20" : "items-start mr-20"}
      `}
      id="message-container"
    >
      <div className={`
        bg-zinc-800
          rounded-md
          overflow-hidden
        `}>
        <div
          id="message-header"
          className={`
          ${isSender ? "bg-green-900" : "bg-blue-900"}
            backdrop-brightness-75
            p-1
            px-2
            text-[12px]
            border-b
          text-gray-300
          `}
        >
          <span className="flex space-x-6">
            <p>{username}</p>
            <span className="flex space-x-1 items-center">
              <Clock className="w-3.5 h-3.5" />
              <p>{displayDate}</p>
            </span>
          </span>
        </div>
        <p
          className={`
            p-2
          `}
        >{message}</p>
      </div>
    </div>
  )
}
