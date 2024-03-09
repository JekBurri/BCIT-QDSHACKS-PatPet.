import { useState } from "react";

import ActionButtonBar from "./shared/ActionButtonBar";

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
  };

  const createPet = (e) => {
    e.preventDefault();
    localStorage.setItem("petname", petname);
    setShowCreatePetForm(false);
  };

  const toggleCreatePetForm = () => {
    setShowCreatePetForm((prev) => !prev);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container max-w-xs mx-auto pt-8">
        <form onSubmit={handleLogin} className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div>
        <ActionButtonBar />
      </div>
      <h1 className="text-center text-4xl">Pat Pet</h1>
      <div className="card">
        <p>Welcome, {localStorage.getItem("username")}!</p>
        {/* Button to toggle the create pet form */}
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
            <button type="submit" className="btn">
              Confirm
            </button>
          </form>
        </div>
      )}
      {/* Optionally display the pet's name if it exists */}
      {localStorage.getItem("petname") && (
        <div className="card">
          <p>Your pet's name is: {localStorage.getItem("petname")}</p>
        </div>
      )}
    </>
  );
}

export default App;
