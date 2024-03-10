import { useEffect, useState } from "react";
import axios from "axios";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="absolute card top-10 left-10 w-2/3 h-2/3">
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>{`${event.date}: ${event.title}`}</li>
          ))}
        </ul>
      ) : (
        <p>No events</p>
      )}
    </div>
  );
}
