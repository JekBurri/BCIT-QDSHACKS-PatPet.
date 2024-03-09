import { useRef, useEffect, useState } from "react";
import axios from "axios";

const PetCanvas = () => {
  const canvasRef = useRef(null);
  const [dogPosition, setDogPosition] = useState({ x: 50, y: 50 });
  const dogSize = { width: 200, height: 200 };
  const [randomEvent, setRandomEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = `/dog.svg`;

    const drawDog = (img) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        dogPosition.x,
        dogPosition.y,
        dogSize.width,
        dogSize.height
      );

      if (randomEvent) {
        context.font = "16px Arial";
        context.fillText(
          `${randomEvent.title} on ${randomEvent.date}`,
          dogPosition.x + dogSize.width + 10,
          dogPosition.y + dogSize.height / 2
        );
      }
    };

    image.onload = () => {
      drawDog(image);
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
        if (events.length > 0) {
          const randomIndex = Math.floor(Math.random() * events.length);
          setRandomEvent(events[randomIndex]);
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);
    const intervalId = setInterval(moveDogRandomly, 1000);

    return () => {
      clearInterval(intervalId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [dogPosition, events]);

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
