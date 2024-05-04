import ClubsIcon from "@/assets/ClubsIcon"
import DiamondsIcon from "@/assets/DiamondsIcon"
import HeartsIcon from "@/assets/HeartsIcon"
import SpadesIcon from "@/assets/SpadesIcon"
import { cn } from "@/lib/utils"

type Props = {
	cardNumber: number
	index: number
	isSelected?: boolean
	isFlipped?: boolean
	onClick?: () => void
	size?: "sm" | "lg"
	isSelectable?: boolean
}

export default function PokerCard({
	cardNumber,
	index,
	isSelected,
	isFlipped = false,
	size = "lg",
	isSelectable = true,
	onClick,
}: Props) {
	const getSymbol = (index: number) => {
		const symbols = [
			{ CardIcon: SpadesIcon, color: "text-black" },
			{ CardIcon: DiamondsIcon, color: "text-red-500" },
			{ CardIcon: ClubsIcon, color: "text-black" },
			{ CardIcon: HeartsIcon, color: "text-red-500" },
		]

		return symbols[index % 4]
	}

	const { CardIcon, color } = getSymbol(index)

	return (
		<button
			type="button"
			className={cn(
				"bg-slate-50 flex flex-col p-1 items-center justify-between rounded-lg border shadow-sm ease-in-out duration-200",
				color,
				isSelectable
					? "hover:shadow-xl hover:cursor-pointer"
					: "hover:cursor-default",
				size === "sm"
					? "w-[60px] h-[90px] lg:w-[80px] lg:h-[120px]"
					: "w-[80px] h-[110px] lg:w-[100px] lg:h-[130px]",
				isSelected && "border-emerald-600 shadow-xl",
			)}
			onClick={onClick}
		>
			{isFlipped ? (
				<div className="bg-red-500 h-full w-full rounded-sm" />
			) : (
				<>
					<div className="flex items-start w-full">
						<div className="flex flex-col justify-center items-center leading-none">
							<span className="md-down:text-[10pt]">{cardNumber}</span>
							<CardIcon className="mt-[2px] w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
						</div>
					</div>

					<CardIcon className="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]" />

					<div className="flex items-end rotate-180 w-full">
						<div className="flex flex-col justify-center items-center leading-none">
							<span className="md-down:text-[10pt]">{cardNumber}</span>
							<CardIcon className="mt-[2px] w-[10px] h-[10px] lg:w-[14px] lg:h-[14px]" />
						</div>
					</div>
				</>
			)}
		</button>
	)
}
