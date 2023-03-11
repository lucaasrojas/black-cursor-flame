import React, { useRef, useEffect } from "react";

const useRequestAnimationFrame = (callback) => {
	const requestRef = useRef<any>();
	const previousTimeRef = useRef();

	const animate = (time) => {
		if (previousTimeRef.current) callback(time - previousTimeRef.current);
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		if (window) {
			requestRef.current = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(requestRef.current);
		}
	}, []);
};

export default useRequestAnimationFrame;
