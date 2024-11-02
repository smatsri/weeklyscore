"use client";

import NewSession from "@/components/sessions/new/new-session";
import { useApi } from "@/lib/session/mock-api";

const NewSessionPage = () => {
  const api = useApi();
  return <NewSession api={api} />;
};

export default NewSessionPage;
