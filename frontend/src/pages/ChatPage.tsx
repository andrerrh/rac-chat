import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";

export function ChatPage() {
  return (
    <>
      <div
        className="flex flex-col pb-4 justify-end w-full items-center space"
        id="chat-page-container"
      >
        <div
          className="flex flex-col w-[90%] h-full bg-zinc-900 rounded-md my-5"
          id="chat-display"
        ></div>
        <div
          className={`
            flex
            w-[90%]
            sm:w-[50%]
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
