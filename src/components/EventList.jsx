export default function EventList({ events }) { // Receive events as a prop
    return (
      <div className="absolute card top-10 left-10 w-2/3 h-2/3">
        {events.lenght > 0 ? (<ul>
          {Object.keys(events).map((date) => (
            <li key={date}>{`${date}: ${events[date]}`}</li>
          ))}
        </ul>) : (<p>no item</p>)}
      </div>
    );
  }