import { useNavigate } from "react-router-dom"

import DiamondsIcon from "@/assets/DiamondsIcon"
import { Button } from "@/components/ui/button"

export default function NotFound() {
	const navigate = useNavigate()

	const cardNumber = 404

	return (
		<div className="h-dvh flex flex-col items-center justify-center gap-8">
			<h3>Page not found</h3>

			<div className="bg-slate-50 flex flex-col p-1 items-center justify-between rounded-lg border shadow-sm ease-in-out duration-200 text-red-500 w-[180px] h-[230px]">
				<div className="flex items-start w-full">
					<div className="flex flex-col justify-center items-center leading-none text-[20px]">
						<span>{cardNumber}</span>
						<DiamondsIcon className="w-8 h-8" />
					</div>
				</div>

				<DiamondsIcon className="w-12 h-12" />

				<div className="flex items-end rotate-180 w-full">
					<div className="flex flex-col justify-center items-center leading-none text-[20px]">
						<span>{cardNumber}</span>
						<DiamondsIcon className="w-8 h-8" />
					</div>
				</div>
			</div>

			<Button onClick={() => navigate("/")}>Return to homepage</Button>
		</div>
	)
}
