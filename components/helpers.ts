// -- Get ball color
export function getBallColor(color: string): string {
  if (color === "random") {
    return getRandomColor();
  }

  return color;
}

// -- Generate random color
function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// -- Get initial random position
export function getInitialPosition(size: number): { x: number; y: number } {
  if (typeof window !== "undefined") {
    let leftPosition = Math.random() * window.innerWidth;
    let topPosition = Math.random() * window.innerHeight;

    if (leftPosition < 0 || leftPosition + size > window.innerWidth) {
      leftPosition = 0 + size;
    }

    if (topPosition < 0 || topPosition + size > window.innerHeight) {
      topPosition = 0 + size;
    }

    return { x: leftPosition, y: topPosition };
  }

  return { x: 0, y: 0 };
}
