import { useRef, useEffect, useState } from "react";
import axios from "axios";
import ActionButtonBar from "./ActionButtonBar";

const PetCanvas = ({ initialImage }) => {
  const canvasRef = useRef(null);
  const [dogPosition, setDogPosition] = useState({ x: 50, y: 50 });
  const dogSize = { width: 200, height: 200 };
  const [randomEvent, setRandomEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [specialEvent, setSpecialEvent] = useState([]);
  const [currentSpecialEvent, setCurrentSpecialEvent] = useState(null);
  const [imageChangedByEvent, setImageChangedByEvent] = useState(false);
  const [currentImage, setCurrentImage] = useState(initialImage || "/dog.svg");
  const originalImage = initialImage || "/dog.svg";
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data.events);
        setSpecialEvent(response.data.specialEvents);
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
    image.src = currentImage;

    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
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

      if (currentSpecialEvent) {
        const eventText = Object.values(currentSpecialEvent)[1];
        context.fillText(
          eventText,
          dogPosition.x + dogSize.width + 10,
          dogPosition.y + dogSize.height / 2 + 20
        );
      }
    };
  }, [currentImage, dogPosition, randomEvent, currentSpecialEvent]);

  useEffect(() => {
    const handleCanvasClick = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (events.length > 0) {
        const randomIndex = Math.floor(Math.random() * events.length);
        setRandomEvent(events[randomIndex]);
      }
    };

    canvasRef.current.addEventListener("click", handleCanvasClick);
    return () =>
      canvasRef.current.removeEventListener("click", handleCanvasClick);
  }, [events, dogPosition]);

  useEffect(() => {
    const moveDogRandomly = () => {
      const deltaX = Math.floor(Math.random() * 20) - 10;
      const deltaY = Math.floor(Math.random() * 20) - 10;
      setDogPosition((prevPosition) => {
        const newX = Math.min(
          Math.max(prevPosition.x + deltaX, 0),
          canvasRef.current.width - dogSize.width
        );
        const newY = Math.min(
          Math.max(prevPosition.y + deltaY, 0),
          canvasRef.current.height - dogSize.height
        );
        return { x: newX, y: newY };
      });
    };
    const intervalId = setInterval(moveDogRandomly, 1000);
    return () => clearInterval(intervalId);
  }, [dogSize]);

  useEffect(() => {
    const specialEventInterval = setInterval(() => {
      if (specialEvent.length > 0 && !imageChangedByEvent) {
        const randomIndex = Math.floor(Math.random() * specialEvent.length);
        setCurrentSpecialEvent(specialEvent[randomIndex]);
      }
    }, 5000);
    return () => clearInterval(specialEventInterval);
  }, [specialEvent]);

  return (
    <div className="card w-full">
      <canvas ref={canvasRef} width={1000} height={300}></canvas>
      <div>
        <ActionButtonBar
          onWater={() => handleAction("water")}
          onFeed={() => handleAction("feed")}
          onSleep={() => handleAction("sleep")}
          onPlay={() => handleAction("play")}
        />
      </div>
    </div>
  );
};

export default PetCanvas;
