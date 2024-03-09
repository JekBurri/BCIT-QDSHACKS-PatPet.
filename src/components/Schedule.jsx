import { useState } from "react";

export default function Schedule({ username, petname }) {
  const [schedule, setSchedule] = useState({
    monday: { morning: false, afternoon: false, evening: false },
    tuesday: { morning: false, afternoon: false, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: false, afternoon: false, evening: false },
    friday: { morning: false, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  });

  return (
    <div className="p-2 flex flex-col gap-4">
      <p>Welcome {username} !</p>
      <p>Please let {petname} know your availablity!</p>
      <p className="text-lg mb-2">Your Schedule</p>
      {Object.keys(schedule).map((day) => (
        <div key={day} className="flex items-center gap-4">
          <p className="w-20 text-left">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </p>
          <div className="flex gap-4">
            {Object.keys(schedule[day]).map((time) => (
              <p
                key={time}
                className={`px-6 rounded-md ${
                  schedule[day][time]
                    ? "bg-[#FFC63A] border border-[#FFC63A]"
                    : "bg-white border border-black"
                }`}
                onClick={() =>
                  setSchedule((prevSchedule) => ({
                    ...prevSchedule,
                    [day]: {
                      ...prevSchedule[day],
                      [time]: !prevSchedule[day][time],
                    },
                  }))
                }
              >
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </p>
            ))}
          </div>
        </div>
      ))}
      <button className="btn">Let get started</button>
    </div>
  );
}
