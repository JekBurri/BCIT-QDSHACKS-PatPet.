import Chatbot from "./chat";
import ActionButtonBar from "../shared/ActionButtonBar";


export default function MainScreen(){
    const toggleCreatePetForm = () => {
        setShowCreatePetForm((prev) => !prev);
      };
    
    return(
        <>
            <div>
                <ActionButtonBar />
            </div>
            <h1 className="text-center text-4xl">Pat Pet</h1>
            <div className="card">
                <p>Welcome, {localStorage.getItem("username")}!</p>
                {!localStorage.getItem("petname") && (
                <button onClick={toggleCreatePetForm} className="btn">
                    {showCreatePetForm ? "Cancel" : "Create Pet"}
                </button>
                )}
            </div>
            {/* Optionally display the pet's name if it exists */}
            {localStorage.getItem("petname") && (
                <div className="card">
                <p>Your pet&apos;s name is: {localStorage.getItem("petname")}</p>
                </div>
            )}
            {/* Render the Chatbot component */}
            <Chatbot />
        </>
    )
}