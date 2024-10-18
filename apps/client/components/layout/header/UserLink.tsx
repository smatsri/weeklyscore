"use client";

import { Button } from "@/components/ui/button";

type Props = {
  userName: string | null;
  onSignOut: () => void;
  onSignIn: () => void;
};
const UserLink = ({ onSignIn, onSignOut, userName }: Props) => {
  if (userName) {
    return (
      <div>
        <div>שלום {userName}</div>
        <div>
          <button onClick={() => onSignOut()}>התנתק</button>
        </div>
      </div>
    );
  }
  return <Button onClick={onSignIn}>התחבר</Button>;
};

export default UserLink;
