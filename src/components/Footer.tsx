import { LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { KEY } from "@/utils/constants"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import type { SendJsonMessage } from "react-use-websocket/dist/lib/types"

type Props = {
  username: string
  sendJsonMessage: SendJsonMessage
}

export default function Footer({ username, sendJsonMessage }: Props) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  function handleLogout() {
    sendJsonMessage({
      move: {
        username,
        remove_player: true,
      },
    })
    localStorage.removeItem(KEY)
    navigate("/")
  }

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => setOpen(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [open])

  return (
    <footer className="flex flex-col gap-4 items-center">
      <p>Playing as {username}</p>

      <div className="flex md-down:flex-col-reverse gap-2 items-center">
        <Button className="flex gap-2" variant="outline" onClick={handleLogout}>
          <LogOut size={16} />
          <span>log out</span>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            create a new room
          </Button>

          <Popover open={open}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setOpen(true)
                }}
              >
                copy room url
              </Button>
            </PopoverTrigger>

            <PopoverContent data-state="open" className="w-fit">
              copied!
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </footer>
  )
}
