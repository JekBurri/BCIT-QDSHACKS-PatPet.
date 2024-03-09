import { useRef, useEffect, useState } from "react";

const PetCanvas = () => {
  const canvasRef = useRef(null);
  const [dogPosition, setDogPosition] = useState({ x: 50, y: 50 });
  const dogSize = { width: 200, height: 200 };
  const [greeting, setGreeting] = useState("");

  const greetings = [
    "Hello!",
    "Woof!",
    "How are you?",
    "Good dog!",
    "Let's play!",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.src = `/dog.svg`;
    image.onload = () => {
      drawDog(image);
    };

    const drawDog = (img) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        dogPosition.x,
        dogPosition.y,
        dogSize.width,
        dogSize.height
      );

      if (greeting) {
        context.font = "16px Arial";
        context.fillText(
          greeting,
          dogPosition.x + dogSize.width + 10,
          dogPosition.y + dogSize.height / 2
        );
      }
    };

    const moveDogRandomly = () => {
      const deltaX = Math.floor(Math.random() * 20) - 10;
      const deltaY = Math.floor(Math.random() * 20) - 10;

      setDogPosition((prevPosition) => {
        const newX = Math.min(
          Math.max(prevPosition.x + deltaX, 0),
          canvas.width - dogSize.width
        );
        const newY = Math.min(
          Math.max(prevPosition.y + deltaY, 0),
          canvas.height - dogSize.height
        );
        return { x: newX, y: newY };
      });
    };

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (
        x >= dogPosition.x &&
        x <= dogPosition.x + dogSize.width &&
        y >= dogPosition.y &&
        y <= dogPosition.y + dogSize.height
      ) {
        const randomGreeting =
          greetings[Math.floor(Math.random() * greetings.length)];
        setGreeting(randomGreeting);
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    const intervalId = setInterval(moveDogRandomly, 1000);

    return () => {
      clearInterval(intervalId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [dogPosition, greeting]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={300}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default PetCanvas;
