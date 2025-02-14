import { useEffect, useState } from "react";

export default function SSEClient() {
  const [messages, setMessages] = useState<{ message: string; dr?: boolean }[]>(
    [],
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/stack");

    eventSource.onmessage = (event) => {
      setMessages((_) => JSON.parse(event.data));
    };
    eventSource.onerror = (e) => {
      console.error("Error connecting to SSE server.");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  const sendMessage = async (dr = false) => {
    await fetch("/api/stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, dr }),
    });
    setInput("");
  };

  const advanceStack = async () => {
    await fetch("/api/stack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "ADVANCE" }),
    });
    setInput("");
  };

  return (
    <div>
      <h1>Nathan's High-Tech Stack Machine</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your name"
      />
      <button onClick={() => sendMessage()}>Add to stack</button>
      <button onClick={() => sendMessage(true)}>Add to DR</button>
      <button onClick={advanceStack}>Advance stack</button>
      <br />
      {messages.length ? "first" : ""}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.message} {msg.dr ? <strong>DR</strong> : null}
          </li>
        ))}
      </ul>
      {messages.length ? "last" : ""}
      <p>
        at the moment if we mess up and want to unstack or to shift the
        order...that is not possible
      </p>
    </div>
  );
}
