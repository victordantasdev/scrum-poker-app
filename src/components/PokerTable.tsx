import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import type { Room } from "@/types"
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types"
import PokerCard from "./PokerCard"

type Props = {
	room: Room | undefined
	sendJsonMessage: SendJsonMessage
}

export default function PokerTable({ room, sendJsonMessage }: Props) {
	const [showCards, setShowCards] = useState(false)

	const moves = room?.moves?.filter((move) => !!move.selected_card) || []
	const hasCards = moves?.length > 0

	function handleFlipCards() {
		const audio = new Audio("/sounds/card-flip.mp3")
		audio.play()
		sendJsonMessage({ settings: { restart_game: false, show_cards: true } })
	}

	function handleRestartGame() {
		sendJsonMessage({ settings: { restart_game: true, show_cards: false } })
	}

	useEffect(() => {
		setShowCards(!!room?.settings?.show_cards)
	}, [moves])

	return (
		<div className="md-down:w-full">
			<div className="bg-gray-700 pr-2 pb-2 rounded-full shadow-2xl">
				<div className="bg-gray-600 h-[200px] sm:w-[550px] sm:h-[300px] rounded-full p-2 lg:p-4">
					<div className="bg-emerald-800 pl-2 pt-2 w-full h-full rounded-full">
						<div className="bg-emerald-600 w-full h-full rounded-full flex flex-col items-center justify-center">
							{hasCards && (
								<div className="flex flex-col gap-4">
									<div className="flex items-center justify-center gap-2">
										{moves.map(({ selected_card, selected_card_index }) => (
											<PokerCard
												key={Math.random()}
												cardNumber={selected_card}
												index={selected_card_index}
												onClick={() => null}
												size="sm"
												isFlipped={!showCards}
												isSelectable={false}
											/>
										))}
									</div>

									<div className="flex items-center justify-center">
										<Button
											onClick={showCards ? handleRestartGame : handleFlipCards}
											className="w-fit md-down:h-fit text-xs lg:text-sm"
										>
											{showCards ? "Restart game" : "Show Cards"}
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
