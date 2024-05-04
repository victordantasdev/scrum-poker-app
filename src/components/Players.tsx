import Avatar from "@/components/Avatar"
import type { Room } from "@/types"

type Props = {
	room: Room | undefined
	players: string[]
}

export default function Players({ room, players }: Props) {
	const checkUserHasPlayed = (username: string) => {
		return (
			room?.moves?.some(
				(move) => move.username === username && move.selected_card >= 0,
			) || false
		)
	}

	return (
		<div className="flex gap-4 mb-[-20px]">
			{players.map((player) => (
				<div key={Math.random()}>
					<Avatar username={player} userPlayed={checkUserHasPlayed(player)} />
				</div>
			))}
		</div>
	)
}
