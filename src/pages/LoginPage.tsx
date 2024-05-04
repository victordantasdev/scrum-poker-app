import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useWebSocket from "react-use-websocket"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { KEY, WS_URL } from "@/utils/constants"

import type { Room } from "@/types"

export default function LoginPage() {
	const navigate = useNavigate()
	const { roomId } = useParams()
	const { lastJsonMessage } = useWebSocket<Room>(`${WS_URL}/${roomId}`)

	const [username, setUsername] = useState("")
	const [shouldDisplayAlert, setShouldDisplayAlert] = useState(false)

	const handleSubmit = () => {
		localStorage.setItem(KEY, username)
		setUsername(username)
		navigate(`/room/${roomId}`)
	}

	useEffect(() => {
		const handleEnter = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				handleSubmit()
			}
		}

		window.addEventListener("keydown", handleEnter)

		return () => {
			window.removeEventListener("keydown", handleEnter)
		}
	})

	useEffect(() => {
		if (lastJsonMessage !== null) {
			const roomIsFull =
				lastJsonMessage?.players?.length >=
				lastJsonMessage?.settings?.max_players
			setShouldDisplayAlert(roomIsFull)
		}
	}, [lastJsonMessage])

	if (shouldDisplayAlert) {
		return (
			<div className="container flex h-dvh w-screen items-center justify-center">
				<Card className="shadow-xl w-[500px]">
					<CardContent className="mt-8">
						This room is full, please try another room.
					</CardContent>

					<CardFooter className="justify-end">
						<Button onClick={() => navigate("/")}>Return to homepage</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="container flex h-dvh w-screen items-center justify-center"
		>
			<Card className="shadow-xl w-[500px]">
				<CardContent className="mt-8">
					<Input
						placeholder="Type your github username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value)
						}}
						autoFocus
					/>
				</CardContent>

				<CardFooter className="justify-end">
					<Button type="submit">enter room</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
