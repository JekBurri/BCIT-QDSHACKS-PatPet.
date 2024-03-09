import { useState } from "react";
import Schedule from "./components/Schedule";
import MainScreen from "./components/MainScreen";

function App() {
  const [username, setUsername] = useState("");
  const [petname, setPetname] = useState("");
  const [showCreatePetForm, setShowCreatePetForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    return !!storedUsername;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    localStorage.setItem("petname", petname);
    setShowCreatePetForm(false);
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
      <div>
        <MainScreen />
      </div>
    </>
  );
}

export default App;
