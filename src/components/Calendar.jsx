import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import EventList from "./EventList";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState({});
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

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
      const updatedEvents = {
        ...events,
        [dateStr]: event,
      };
      setEvents(updatedEvents);
      persistEvents(updatedEvents);
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

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    setEvents(storedEvents);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={addEvent} className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-5">
          <p>Date</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<input className="input -text--primary" />}
          />
        </div>
        <div className="col-span-12 md:col-span-7">
          <label>Event Title (Exam/Assignment)</label>
          <div className="flex">
            <input
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="Add Event"
              className="input mr-2 mb-2"
            />
            <button type="submit" className="btn px-3 py-2">
              Add
            </button>
            {/* Add ml-2 or a similar class for margin left */}
            <button
              className="btn px-3 py-2 ml-2" // Added ml-2 here
              onClick={() => setIsListOpen((prev) => !prev)}
            >
              {isListOpen ? "Close" : "List"}
            </button>
            {isListOpen && <EventList events={events} />}
          </div>
        </div>
      </form>
    </div>
  );
}
