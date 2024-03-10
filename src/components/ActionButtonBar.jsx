import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlassWater,
  faUtensils,
  faBed,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
export default function ActionButtonBar({ onWater, onFeed, onSleep, onPlay }) {
  return (
    <div className="p-4">
      <div className="w-full mx-4 flex justify-center gap-4">
        <button className="action-button" onClick={onWater}>
          <FontAwesomeIcon icon={faGlassWater} className="mx-2" />
          Water
        </button>
        <button className="action-button" onClick={onFeed}>
          <FontAwesomeIcon icon={faUtensils} className="mx-2" />
          Feed
        </button>
        <button className="action-button" onClick={onSleep}>
          <FontAwesomeIcon icon={faBed} className="mx-2" />
          Sleep
        </button>
        <button className="action-button" onClick={onPlay}>
          <FontAwesomeIcon icon={faGamepad} className="mx-2" />
          Play
        </button>
      </div>
    </div>
  );
}
