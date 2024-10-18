"use client";

import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const firebase = useFirebaseContext();
  return (
    <div>
      <Button onClick={() => firebase.signin()}>Login</Button>
    </div>
  );
}
