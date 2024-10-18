"use client";

import { useContext, createContext } from "react";
import useFirebase from "./useFirebase";

const nullContextValue = {
  getIdToken: async () => {
    throw new Error("Not implemented");
  },
  signin: async () => {
    throw new Error("Not implemented");
  },
  signout: async () => {
    throw new Error("Not implemented");
  },
  user: null,
};

const FirebaseContext =
  createContext<ReturnType<typeof useFirebase>>(nullContextValue);

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const firebase = useFirebase();
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
export const useFirebaseContext = () => useContext(FirebaseContext);
