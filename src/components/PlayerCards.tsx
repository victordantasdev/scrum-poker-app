import { cn } from "@/lib/utils"
import { DECK } from "@/utils/constants"

type Props = {
	deckLength?: number
}

export default function PlayerCards({ deckLength = DECK.length }: Props) {
	const range = Array.from(Array(deckLength).keys())

	const cardPosition: Record<number, { rotate: string; position: string }> = {
		0: {
			rotate: "rotate-[-30deg]",
			position: "left-10",
		},
		1: {
			rotate: "rotate-[-20deg]",
			position: "left-7",
		},
		2: {
			rotate: "rotate-[-10deg]",
			position: "left-4",
		},
		3: {
			rotate: "",
			position: "",
		},
		4: {
			rotate: "rotate-[10deg]",
			position: "right-4",
		},
		5: {
			rotate: "rotate-[20deg]",
			position: "right-7",
		},
		6: {
			rotate: "rotate-[30deg]",
			position: "right-10",
		},
	}

	return (
		<div className="flex relative top-[-20px]">
			{range.map((i) => (
				<div
					key={Math.random()}
					className={cn(
						"bg-slate-200 h-[32px] w-[22px] lg:h-[35px] lg:w-[25px] rounded-[3px] p-1 relative",
						cardPosition[i].rotate,
						cardPosition[i].position,
					)}
				>
					<div className="bg-red-500 h-full w-full rounded-[3px]" />
				</div>
			))}
		</div>
	)
}
