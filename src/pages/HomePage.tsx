import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import uuid from "short-uuid"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HomePage() {
	const navigate = useNavigate()

	const [roomName, setRoomName] = useState("")

	function handleSubmit() {
		if (roomName) {
			navigate(`/room/${roomName}`)
			return
		}

		navigate(`/room/${uuid.generate()}`)
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

	return (
		<div className="container flex h-dvh w-screen items-center justify-center">
			<Card className="p-4 shadow-xl">
				<CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold">
					Scrum Poker
				</CardTitle>
				<CardDescription className="text-center">
					Easy-to-use and fun story point estimations.
				</CardDescription>

				<CardContent className="mt-8 flex gap-2">
					<Input
						value={roomName}
						placeholder="Room name"
						onChange={(e) => setRoomName(e.target.value)}
						autoFocus
					/>

					<Button
						variant="outline"
						onClick={handleSubmit}
						className="bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
					>
						enter room
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
