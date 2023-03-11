import React, { useState, useCallback, useEffect } from "react";
import { CircleStyles, Coords } from "./types";
import useRequestAnimationFrame from "./useRequestAnimationFrame";
const elements = Array.from(Array(10).keys(), () => {
	return { left: "0px", top: "0px", scale: 1, x: 0, y: 0 };
});
function BlackFlameCursor() {
	const [circles, setCircles] = useState<CircleStyles[]>(elements);
	useRequestAnimationFrame(() => {
		initBlackFire();
	});

	const initBlackFire = useCallback(() => {
		const coords: Coords = { x: 0, y: 0 };

		if (coords && circles) {
			window.addEventListener("mousemove", function (e) {
				coords.x = e.clientX;
				coords.y = e.clientY;
				positionCircles(coords, circles);
			});

			const positionCircles = (coords: Coords, circles: CircleStyles[]) => {
				let x: number = coords.x;
				let y: number = coords.y;
				let newCircles: CircleStyles[] = [];
				circles.forEach(function (circle: CircleStyles, index: number) {
					circle.left = `${x - 12}px`;
					circle.top = `${y - 12}px`;
					circle.scale = (10 - index) / 10;
					circle.x = x;
					circle.y = y;

					const nextCircle = circles[index + 1]
						? circles[index + 1]
						: circles[0];

					x += (nextCircle.x - x) * 0.5;
					y += (nextCircle.y - y) * 0.5;

					newCircles.push(circle);
				});

				setCircles(newCircles);
			};
			requestAnimationFrame(
				positionCircles(coords, circles) as unknown as FrameRequestCallback
			);
		}
	}, [circles]);

	return (
		<>
			{circles.map(({ scale, top, left }: Partial<CircleStyles>, index) => (
				<div
					key={index}
					style={{
						height: 24,
						width: 24,
						borderRadius: 24,
						backgroundColor: "black",
						position: "absolute",
						top,
						left,
						scale: `${scale}`,
					}}
				></div>
			))}
		</>
	);
}

export default BlackFlameCursor;
