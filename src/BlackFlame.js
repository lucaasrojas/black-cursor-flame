import React from "react";

function BlackFlame() {
  const elements = Array.from(Array(10).keys(), () => {
    return { left: "0px", top: "0px", scale: 1, x: 0, y: 0 };
  });
  const [circles, setCircles] = React.useState(elements);

  React.useEffect(() => {
    if (document && window) {
      initBlackFire();
    }
  }, []);

  const initBlackFire = React.useCallback(() => {
    const coords = { x: 0, y: 0 };

    if (coords && circles) {
      window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
        positionCircles(coords, circles);
      });

      const positionCircles = (coords, circles) => {
        let x = coords.x;
        let y = coords.y;
        let newCircles = [];
        circles.forEach(function (circle, index) {
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
    }
  }, [circles]);

  return (
    <>
      {circles.map(({ scale, top, left }) => (
        <div
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

export default BlackFlame;
