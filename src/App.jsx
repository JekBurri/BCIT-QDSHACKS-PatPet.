import { useState } from "react";
import Chatbot from "./components/Chat";
import PetCanvas from "./components/PetCanvas";
import Calendar from "./components/Calendar";

function App() {
  const [username, setUsername] = useState("");
  const [petname, setPetname] = useState("");
  const [programName, setProgramName] = useState("");
  const [showCreatePetForm, setShowCreatePetForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return !!storedUsername;
  });
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    localStorage.setItem("petname", petname);
    setShowCreatePetForm(false);
    localStorage.setItem("program", programName);
  };


  const toggleCreatePetForm = () => {
    setShowCreatePetForm((prev) => !prev);
  };

  if (!isLoggedIn) {
    return (
      <div className="h-svh w-full flex justify-center items-center">
      <div className="login-container max-w-[700px] w-2/3 m-auto md:w-1/2 ">
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
            <button type="submit" className="btn">
              Create Pet
            </button>

        </form>
      </div>
    </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-4xl">Pat Pet</h1>
      <div className="card">
        <p>Welcome, {localStorage.getItem("username")}!</p>
        {!localStorage.getItem("petname") && (
          <button onClick={toggleCreatePetForm} className="btn">
            {showCreatePetForm ? "Cancel" : "Create Pet"}
          </button>
        )}
      </div>
      {localStorage.getItem("petname") && (
        <div className="card">
          <p>Your pet&apos;s name is: {localStorage.getItem("petname")}</p>
        </div>
      )}
      <div>
        <PetCanvas />
      </div>
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
    </>
  );
}

export default App;
