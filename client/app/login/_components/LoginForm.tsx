"use client";

import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";

export default function LoginForm() {
  const firebase = useFirebaseContext();
  return (
    <div>
      <button onClick={() => firebase.signin()}>Login</button>
    </div>
  );
}
