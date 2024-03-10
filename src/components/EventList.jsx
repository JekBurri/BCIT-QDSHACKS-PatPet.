export default function EventList({ events }) { // Receive events as a prop
  // console.log(events);  
  return (
      <div className="absolute card bottom-20 right-0   p-10">
        <h1>Event List</h1>
        {events.length > 0 ? (
          <ul className="w-[400px] h-40 overflow-x-auto">
            {events.map((item, index) => ( // corrected the syntax
              <li key={index}>{`${item.date} ${item.title}`}</li>
            ))}
          </ul>
        ) : (
          <p>no item</p>
        )}
      </div>
    );
}