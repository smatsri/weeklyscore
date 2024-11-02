"use client";

import NewSession from "@/components/sessions/new/new-session";
import { useSessionApi } from "@/lib/session";

const NewSessionPage = () => {
  const api = useSessionApi(
    "fe53d46e-6544-4de2-a080-44ffd4eb858b",
    "93e7041f-926c-4cc6-a588-c616d6a027f7"
  );
  if (api.ready === false) {
    return <div>Loading...</div>;
  }
  return (
    <NewSession api={api} sessionId="fe53d46e-6544-4de2-a080-44ffd4eb858b" />
  );
};

export default NewSessionPage;
