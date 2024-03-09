import { useState } from "react";
import Chatbot from "./chat";
function App() {

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
      {localStorage.getItem("petname") && (
        <div className="card">
          <p>Your pet&apos;s name is: {localStorage.getItem("petname")}</p>
        </div>
      )}
      {/* Render the Chatbot component */}
      <Chatbot />
    </>
  );
}

export default App;
