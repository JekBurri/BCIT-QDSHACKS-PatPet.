import { useRef, useEffect, useState } from "react";
import axios from "axios";

const PetCanvas = ({ initialImage }) => {
  const canvasRef = useRef(null);
  const [dogPosition, setDogPosition] = useState({ x: 50, y: 50 });
  const dogSize = { width: 200, height: 200 };
  const [randomEvent, setRandomEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [specialEvent, setSpecialEvent] = useState([]);
  const [currentSpecialEvent, setCurrentSpecialEvent] = useState(null);
  const [currentImage, setCurrentImage] = useState("/dog.svg");
  const originalImage = "/dog.svg";

  useEffect(() => {
    setCurrentImage(initialImage || "/dog.svg");
  }, [initialImage]);

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

      if (currentSpecialEvent) {
        const eventText = Object.values(currentSpecialEvent)[1];
        context.fillText(
          eventText,
          dogPosition.x + dogSize.width + 10,
          dogPosition.y + dogSize.height / 2 + 20
        );

        if (eventText === "I'm sleepy...") {
          setCurrentImage("/sleepy-cat.jpg");
        } else if (eventText === "I'm hungry!") {
          setCurrentImage("/hungry-cat.png"); // Change the image to hungry-cat.png
        }
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

      if (events.length > 0) {
        const randomIndex = Math.floor(Math.random() * events.length);
        setRandomEvent(events[randomIndex]);
      }

      if (
        x >= dogPosition.x &&
        x <= dogPosition.x + dogSize.width &&
        y >= dogPosition.y &&
        y <= dogPosition.y + dogSize.height
      ) {
        if (currentImage !== originalImage) {
          setCurrentImage(originalImage);
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);
    const intervalId = setInterval(moveDogRandomly, 1000);

    return () => {
      clearInterval(intervalId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [
    dogPosition,
    events,
    randomEvent,
    currentSpecialEvent,
    currentImage,
    originalImage,
  ]);

  useEffect(() => {
    const specialEventInterval = setInterval(() => {
      if (specialEvent.length > 0) {
        const randomIndex = Math.floor(Math.random() * specialEvent.length);
        setCurrentSpecialEvent(specialEvent[randomIndex]);
      }
    }, 5000);

    return () => clearInterval(specialEventInterval);
  }, [specialEvent]);

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
