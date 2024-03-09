import axios from "axios";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("/api/chat", { messages })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
}
