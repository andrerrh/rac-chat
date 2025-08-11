import { MessageCircle } from "lucide-react"

export function Home() {
  return (
    <div className="h-full">
      <div className="h-full space-y-12 flex flex-col justify-center items-center">
        <MessageCircle className="text-gray-700 w-50 h-50" />
        <h2 className=" text-xl text-gray-300">
          Selecione um usuário na lista para iniciar uma conversa!
        </h2>
      </div>
    </div>
  )
}
