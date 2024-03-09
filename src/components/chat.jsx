import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "hello" },
  ]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    const updatedMessages = messages.concat(userMessage);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: updatedMessages.map((msg) => ({
          role: msg.role === "bot" ? "assistant" : msg.role,
          content: msg.content,
        })),
      });

      setMessages([
        ...updatedMessages,
        { role: "bot", content: completion.choices[0].message.content },
      ]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
    }

    setInput("");
  }

  return (
    <div>
      <h1>Chat with OpenAI</h1>
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
