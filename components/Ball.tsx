import { useEffect, useState } from "react";
import { getBallColor, getInitialPosition } from "./helpers";
import styles from "@/styles/Ball.module.css"

type Props = {
  color: string;
  speed: number;
  size: number;
};

export function Ball({ color, speed, size }: Props) {
  const ballSize = `${size}px`;

  const [position, setPosition] = useState(getInitialPosition(size));
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [ballColor, _] = useState(getBallColor(color));

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setPosition((prevPosition) => ({
        x: prevPosition.x + direction.x * speed,
        y: prevPosition.y + direction.y * speed,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, speed]);

  useEffect(() => {
    const { x, y } = position;
    const { innerWidth, innerHeight } = window;

    if (x + size > innerWidth || x < 0) {
      setDirection((prevDirection) => ({
        x: -prevDirection.x,
        y: prevDirection.y,
      }));
    }

    if (y + size > innerHeight || y < 0) {
      setDirection((prevDirection) => ({
        x: prevDirection.x,
        y: -prevDirection.y,
      }));
    }
  }, [position, size]);

  return (
    <div
      className={styles.ball}
      style={{
        width: ballSize,
        height: ballSize,
        backgroundColor: ballColor,
        left: position.x,
        top: position.y,
      }}
    />
  );
}
