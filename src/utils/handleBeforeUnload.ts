import type { SendJsonMessage } from "react-use-websocket/dist/lib/types"

export function handleBeforeUnload(
	sendJsonMessage: SendJsonMessage,
	username: string,
) {
	window.onbeforeunload = () => {
		sendJsonMessage({
			move: {
				username,
				remove_player: true,
			},
		})
	}
}
