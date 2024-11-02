import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";
import { Api } from "@/components/sessions/new/model";
import { Command } from "@weeklyscore/schema";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useWS = () => {
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

      setSocket(s);

      return () => {
        s?.disconnect();
      };
    };
    run();
  }, [user, getIdToken]);

  return {
    subscribe: (callback: Function) => () => {
      if (!socket) {
        throw new Error("Socket not connected");
      }

      socket.on("message", (msg: string) => {
        console.log("Received message: ", msg);
        callback(JSON.parse(msg));
      });
      return () => {};
    },
    publish(cmd: Command) {
      if (!socket) {
        throw new Error("Socket not connected");
      }
      socket.emit("message", JSON.stringify(cmd));
    },
  };
};

export default useWS;
