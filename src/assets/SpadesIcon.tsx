function SpadesIcon({ className }: { className?: string }) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="72"
			height="72"
			fill="none"
			viewBox="0 0 72 72"
			className={className}
		>
			<path fill="url(#pattern0_15_361)" d="M0 0H72V72H0z" />
			<defs>
				<pattern
					id="pattern0_15_361"
					width="1"
					height="1"
					patternContentUnits="objectBoundingBox"
				>
					<use transform="scale(.01389)" xlinkHref="#image0_15_361" />
				</pattern>
				<image
					id="image0_15_361"
					width="72"
					height="72"
					xlinkHref="data:image/png;base64,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"
				/>
			</defs>
		</svg>
	)
}

export default SpadesIcon
