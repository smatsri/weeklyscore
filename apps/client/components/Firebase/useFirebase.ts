"use client";
import { firebaseConfig } from "@/lib/auth/firebase";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.debug("Initializing Firebase...");
    const _app = initializeApp(firebaseConfig);
    console.debug("Firebase initialized:", _app.name);
    setApp(_app);

    const auth = getAuth(_app);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const auth = useMemo(() => (app ? getAuth(app) : null), [app]);

  const signin = useCallback(async () => {
    if (!auth) return;

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);
      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }, [auth]);

  const getIdToken = useCallback(async () => {
    if (!app) return null;

    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      const idToken = await user.getIdToken();
      return idToken;
    } else {
      return null;
    }
  }, [app]);

  const signout = useCallback(async () => {
    if (!auth) return;
    await auth.signOut();
    setUser(null);
  }, [auth]);

  return { signin, signout, user, getIdToken };
};

export default useFirebase;
