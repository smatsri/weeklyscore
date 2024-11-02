import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";
import {
  Command,
  CommandSchema,
  Event,
  EventSchema,
} from "@weeklyscore/schema";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useWS = () => {
  const [ready, setReady] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user, getIdToken } = useFirebaseContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    let s: Socket;

    const run = async () => {
      const idToken = await getIdToken();
      console.log("Connecting to server");
      s = io("http://localhost:4000", {
        auth: {
          token: idToken,
        },
      });

      s.on("connect", () => {
        console.log("Connected to server");
      });

      s.connect();

      setSocket(s);
      setReady(true);
    };

    run();

    return () => {
      s?.disconnect();
    };
  }, [user, getIdToken]);

  return {
    ready,
    subscribe: (callback: (event: Event) => void) => () => {
      if (!socket) {
        throw new Error("Socket not connected");
      }

      socket.on("message", (msg: string) => {
        console.log("Received message: ", msg);
        const data = JSON.parse(msg);

        const parseRes = EventSchema.safeParse(data);
        if (parseRes.success) {
          callback(parseRes.data as Event);
        }
      });
      return () => {};
    },
    publish(cmd: Command) {
      if (!socket) {
        throw new Error("Socket not connected");
      }

      const parseRes = CommandSchema.safeParse(cmd);
      if (!parseRes.success) {
        throw new Error("Invalid command");
      }
      socket.emit("message", JSON.stringify(cmd));
    },
  };
};

export default useWS;
