import { cn } from "@/lib/utils"
import type { Room } from "@/types"

type Props = {
  room: Room | undefined
  players: string[]
}

export default function Players({ room, players }: Props) {
  const userPlayed = (username: string) => {
    return (
      room?.moves?.some(
        (move) => move.username === username && !!move.selected_card
      ) || false
    )
  }

  return (
    <div className="flex gap-4 mb-[-20px]">
      {players.map((player) => (
        <div key={Math.random()} className="flex flex-col gap-2 items-center mb-4">
          <div
            className={cn(
              "w-10 h-16 rounded-sm",
              userPlayed(player) ? "bg-green-500" : "bg-slate-200"
            )}
          />

          <p>{player}</p>
        </div>
      ))}
    </div>
  )
}
