import { KeyRound, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Navigation() {

  const navigate = useNavigate()

  return (
    <div
      className={`
        flex
        flex-col
space-y-4
        *:hover:backdrop-brightness-150
        *:select-none
        *:cursor-pointer
        *:p-4
        *:rounded-md
        *:flex
        *:space-x-4
      `}
    >
      <span
        onClick={() => navigate("/register")}
      >
        <PlusCircle />
        <p>Registrar</p>
      </span>
      <span
        onClick={() => navigate("/login")}
      >
        <KeyRound />
        <p>Login</p>
      </span>
    </div>
  )
}
