import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import { Link } from "react-router-dom"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import PlayerCards from "./PlayerCards"

type Props = {
	userPlayed: boolean
	username: string
}

export default function Avatar({ username, userPlayed }: Props) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						to={`https://github.com/${username}`}
						className="flex flex-col items-center content-center hover:cursor-pointer"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={`https://github.com/${username}.png`}
							alt={`@${username}`}
							className={cn(
								"w-16 h-16 lg:w-20 lg:h-20 rounded-full",
								userPlayed ? "border-2 border-emerald-500" : "",
							)}
						/>

						<PlayerCards />
					</Link>
				</TooltipTrigger>

				<TooltipContent className="flex items-center justify-center">
					<Github size={16} />/{username}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
