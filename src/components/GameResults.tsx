import type { Room } from "@/types"
import { Card, CardContent } from "./ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table"

type Props = {
	room: Room | undefined
}

export default function GameResult({ room }: Props) {
	const moves = room?.moves?.filter((move) => move.selected_card >= 0) || []
	const average =
		moves.reduce((acc, move) => acc + move.selected_card, 0) / moves.length

	const formattedAverage =
		Math.round(average) === average
			? String(average)
			: `~${Math.round(average)}`

	return (
		<div className="flex gap-4 ">
			<Card>
				<CardContent className="mt-4">
					<Table className="max-w-full">
						<TableHeader>
							<TableRow>
								<TableHead>User</TableHead>
								<TableHead className="text-center">Vote</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{moves.map((move) => (
								<TableRow key={Math.random()}>
									<TableCell>{move.username}</TableCell>
									<TableCell className="text-center">
										{move.selected_card}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell>Average</TableCell>
								<TableCell className="text-center">
									{formattedAverage}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
