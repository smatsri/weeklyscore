"use client";

import { useFirebaseContext } from "@/components/Firebase/FirebaseProvider";
import { Header } from "@/components/layout/header";
import { useMemo } from "react";

const HeaderContainer = () => {
  const firebase = useFirebaseContext();
  const userName = useMemo(
    () => firebase?.user?.displayName || null,
    [firebase]
  );
  return (
    <Header
      userName={userName}
      onSignOut={firebase.signout}
      onSignIn={firebase.signin}
    />
  );
};

export default HeaderContainer;
