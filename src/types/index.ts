export type PokerCardProps = {
	cardNumber: string
	index: number
}

export type Settings = {
	deck: number[]
	show_cards: boolean
	restart_game: boolean
	max_players: number
}

export type Move = {
	username: string
	selected_card: string
	selected_card_index: number
}

export type Room = {
	settings: Settings
	moves: Move[]
	players: string[]
}
