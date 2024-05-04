import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useWebSocket from "react-use-websocket"

import Deck from "@/components/Deck"
import Footer from "@/components/Footer"
import GameResult from "@/components/GameResults"
import Players from "@/components/Players"
import PokerTable from "@/components/PokerTable"

import { KEY, WS_URL } from "@/utils/constants"
import { getInitialSettings } from "@/utils/getinitialSettings"
import { handleBeforeUnload } from "@/utils/handleBeforeUnload"

import type { Room } from "@/types"

export default function RoomPage() {
	const { roomId } = useParams()
	const navigate = useNavigate()
	const username = localStorage.getItem(KEY) || ""
	const { sendJsonMessage, lastJsonMessage } = useWebSocket<Room>(
		`${WS_URL}/${roomId}`,
	)

	const [room, setRoom] = useState<Room>()
	const [players, setPlayers] = useState<string[]>([])
	const [playerSelectedCard, setPlayerSelectedCard] = useState<number>(-1)
	const [shouldDisplayGameResult, setShouldDisplayGameResult] = useState(false)

	function handleSetRoomData() {
		const roomData = lastJsonMessage
		setRoom(roomData)

		const players = roomData?.players
		const playersData = players?.filter((player) => player !== username) || []
		setPlayers(playersData)

		const moves = roomData?.moves
		const movesData = moves?.filter((move) => move.selected_card !== -1) || []
		const userSelectedCardData = movesData?.find(
			(move) => move?.username === username,
		)?.selected_card

		setPlayerSelectedCard(userSelectedCardData || -1)

		const showCards = roomData?.settings?.show_cards
		setShouldDisplayGameResult(showCards)
	}

	useEffect(() => {
		if (lastJsonMessage) {
			handleSetRoomData()
		}
	}, [lastJsonMessage])

	useEffect(() => {
		if (!username?.length) {
			navigate(`/room/${roomId}/login`)
		}

		sendJsonMessage(getInitialSettings(username))
	}, [username])

	useEffect(() => {
		handleBeforeUnload(sendJsonMessage, username)
	})

	if (!username?.length) return <></>

	return (
		<div className="container flex flex-col h-dvh items-center justify-center gap-6">
			<Players room={room} players={players} />
			<PokerTable room={room} sendJsonMessage={sendJsonMessage} />

			{shouldDisplayGameResult ? (
				<GameResult room={room} />
			) : (
				<>
					<Deck
						username={username}
						playerSelectedCard={playerSelectedCard}
						sendJsonMessage={sendJsonMessage}
					/>

					<Footer username={username} sendJsonMessage={sendJsonMessage} />
				</>
			)}
		</div>
	)
}
