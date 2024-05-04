import { DECK } from "./constants"

export const getInitialSettings = (username: string) => ({
	settings: {
		deck: DECK,
		show_cards: false,
		restart_game: false,
		max_players: 3,
	},
	player: username,
})
