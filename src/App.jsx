import { useState, useEffect } from "react";
import Chatbot from "./components/Chat";
import PetCanvas from "./components/PetCanvas";
import Calendar from "./components/Calendar";
import DatePicker from "react-datepicker";

function App() {
  const [username, setUsername] = useState("");
  const [petname, setPetname] = useState("");
  const [programName, setProgramName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreatePetForm, setShowCreatePetForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return !!storedUsername;
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    localStorage.setItem("petname", petname);
    localStorage.setItem("selectedImage", selectedImage);
    setShowCreatePetForm(false);
    localStorage.setItem("program", programName);
    localStorage.setItem("graduation", selectedDate);
  };


  const toggleCreatePetForm = () => {
    setShowCreatePetForm((prev) => !prev);
  };

  useEffect(() => {
    setSelectedImage(localStorage.getItem("selectedImage")); // Retrieve the selected image from localStorage
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="h-svh w-full flex justify-center items-center">
      <div className="login-container max-w-[700px] w-2/3 m-auto lg:w-1/2 ">
        <h1>PATPET</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-8 mt-10">
          <div className="flex flex-col">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input mt-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Your Pet Name</label>
            <input
                type="text"
                placeholder="Enter your pet's name"
                value={petname}
                onChange={(e) => setPetname(e.target.value)}
                className="input mt-2"
                required
            />
          </div>
          <div className="flex flex-col">
            <label>Your Program Name</label>
            <input
                type="text"
                placeholder="Enter your program name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="input mt-2"
                required
            />
          </div>
          <div className="flex flex-col">
            <label>Expected Graduation</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={<input className="input w-full mt-2" />}
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2">Your schedule</p>
            <Calendar />
          </div>
            <button type="submit" className="btn">
              Create Pet
            </button>
        </form>
      </div>
    </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-12 py-10 flex flex-col gap-6">
      <div className="card py-4 px-14 font-bold text-3xl">
        <p>Welcome, {localStorage.getItem("username")}!</p>
        {!localStorage.getItem("petname") && (
          <button onClick={toggleCreatePetForm} className="btn">
            {showCreatePetForm ? "Cancel" : "Create Pet"}
          </button>
        )}
      </div>

      {showCreatePetForm && !localStorage.getItem("petname") && (
        <div className="login-container max-w-xs mx-auto pt-8">
          <form onSubmit={createPet} className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Enter your pet's name"
              value={petname}
              onChange={(e) => setPetname(e.target.value)}
              className="input"
              required
            />
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select the initial image for your pet:
            </label>
            <select
              id="image"
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
              className="input"
              required
            >
              <option value="/dog.svg">Dog</option>
              <option value="/sleepy-cat.jpg">Sleepy Cat</option>
              <option value="/hungry-cat.png">Hungry Cat</option>
            </select>
            <button type="submit" className="btn">
              Confirm
            </button>
          </form>
        </div>
      )}
      {localStorage.getItem("petname") && selectedImage && (
        <div>
          <PetCanvas initialImage={selectedImage} />
        </div>
      )}
      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded shadow-lg max-w-md w-full">
            <button
              onClick={toggleChatbot}
              className="absolute top-0 right-0 mt-4 mr-4 bg-transparent text-gray-700 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              title="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <Chatbot />
          </div>
        </div>
      )}

      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-40"
      >
        Chat with your pet
      </button>

      <div>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
