import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState({});

  const addEvent = async (e) => {
    e.preventDefault();
    const dateStr = selectedDate.toISOString().split("T")[0];
    try {
      const response = await axios.post("/api/events", {
        event: {
          date: dateStr,
          title: event,
        },
      });

      console.log("Event added successfully:", response.data);
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateStr]: event,
      }));
      setEvent("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const persistEvents = async (updatedEvents) => {
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  useState(() => {
    persistEvents(events);
  }, [events]);

  return (
    <div className="p-2 flex flex-col gap-4">
      <form onSubmit={addEvent} className="flex gap-2">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={<input className="border rounded-md" />}
        />
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="Add Event"
          className="border rounded-md"
        />
        <button type="submit" className="border rounded-md p-1">
          Add Event
        </button>
      </form>
    </div>
  );
}
