import { Chat } from "../../components/chat";

interface Message {
  id: string;
  content: string;
}

export default function Home() {
  return (
    <div>
      <Chat />
    </div>
  );
}
