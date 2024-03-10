// eslint-disable-next-line react/prop-types
export default function ActionButtonBar({ onWater, onFeed, onSleep, onPlay }) {
  return (
    <div className="p-4">
      <div className="w-full mx-4 flex flex-col justify-center gap-4">
        <button className="action-button" onClick={onFeed}>
          <img src='food-drink-milk.png' className="w-10 mx-1" alt="milk-img"/>
          Feed
        </button>
        <button className="action-button" onClick={onSleep}>
          <img src='weather-cresent-moon-stars.png' className="w-10 mx-1" alt="sleep-img"/>
          Sleep
        </button>
        <button className="action-button" onClick={onPlay}>
          <img src='business-products-magic-rabbit.png' className="w-10 mx-1" alt="play-img"/>
          Play
        </button>
      </div>
    </div>
  );
}
