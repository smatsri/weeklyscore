"use client";
// pages/chat.tsx
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("");

  useEffect(() => {
    // Connect to the Socket.IO server
    socket = io("http://localhost:4000");

    // Listen for incoming messages
    socket.on("message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const joinRoom = () => {
    if (room) {
      socket.emit("join", room);
      setRoom("");
    }
  };

  const leaveRoom = () => {
    if (room) {
      socket.emit("leave", room);
      setRoom("");
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>

      <div>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room name"
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>

      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
