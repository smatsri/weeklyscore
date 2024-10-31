"use client";
import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";
// pages/chat.tsx
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

const T1Page: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const { user, getIdToken } = useFirebaseContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    const run = async () => {
      const idToken = await getIdToken();
      console.log("Connecting to server");
      socket = io("http://localhost:4000", {
        auth: {
          token: idToken,
        },
      });

      socket.on("message", (msg: string) => {
        console.log("Received message: ", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      return () => {
        socket?.disconnect();
      };
    };
    run();
  }, [user, getIdToken]);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", message);
    }
  };

  return (
    <div>
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

export default T1Page;
