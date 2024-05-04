import PokerCard from "@/components/PokerCard"
import { DECK } from "@/utils/constants"

import type { PokerCardProps } from "@/types"
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types"

type Props = {
	username: string
	playerSelectedCard: number
	sendJsonMessage: SendJsonMessage
}

export default function Deck({
	username,
	playerSelectedCard,
	sendJsonMessage,
}: Props) {
	function handleSelectCard(pokerCard: PokerCardProps) {
		sendJsonMessage({
			move: {
				selected_card: pokerCard.cardNumber,
				selected_card_index: pokerCard.index,
				username,
			},
		})
	}

	return (
		<div className="flex items-center justify-start gap-4 md-down:overflow-y-scroll max-w-full">
			{DECK.map((cardNumber, index) => (
				<div key={Math.random()}>
					<PokerCard
						cardNumber={cardNumber}
						index={index}
						onClick={() => handleSelectCard({ cardNumber, index })}
						isSelected={playerSelectedCard === cardNumber}
					/>
				</div>
			))}
		</div>
	)
}
