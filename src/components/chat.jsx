import { useState, useEffect, useRef } from "react";
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
  const chatHistoryRef = useRef(null);

  const username = localStorage.getItem("username");
  const petname = localStorage.getItem("petname");

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

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

      const botMessage = {
        role: "bot",
        content: `${completion.choices[0].message.content} Meow!`,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
    }

    setInput("");
  }

  return (
    <div className="card -bg--ternary mt-8 p-4">
      <h1 className="-text--on-ternary font-bold text-lg text-center">
        Message History
      </h1>
      <div ref={chatHistoryRef} className="chat-history h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === "user" ? (
              <div className="flex flex-col mt-4">
                <div className="flex items-center justify-end">
                  <p className="font-bold -text--primary text-lg">{username}</p>
                  <img src="/user-icon.png" className="w-11 ml-2" alt="user" />
                </div>
                <div className="w-2/3 -bg--secondary mx-12 p-4 rounded-tl-3xl rounded-b-3xl min-h-20">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="flex flex-col mt-4">
                <div className="flex items-center">
                  <img src="/pet-icon.png" className="w-11 mr-2" alt="pet" />
                  <p className="font-bold -text--primary text-lg">{petname}</p>
                </div>
                <div className="w-2/3 -bg--on-ternary mx-12 p-4 rounded-tr-3xl rounded-b-3xl min-h-20">
                  {msg.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={sendMessage} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="input"
          />
          <button type="submit" className="btn px-4 py-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
