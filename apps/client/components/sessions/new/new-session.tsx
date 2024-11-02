"use client";

import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Title, Layout, Main } from "./layout";

import { Buttons } from "./buttons";
import { Api, useNewSession } from "@/lib/session";

type Props = {
  api: Api;
  sessionId: string;
};
const NewSession = ({ api, sessionId }: Props) => {
  const { addBuyin, addPlayer, buyins, players } = useNewSession(
    sessionId,
    api
  );
  return (
    <Layout>
      <Title title="סשיין חדש" />
      <Main>
        <Card>
          <CardHeader>
            <Buttons
              addBuyin={addBuyin}
              addPlayer={addPlayer}
              players={players}
            />
          </CardHeader>
          <CardContent>
            <BuyinTable buyins={buyins} />
          </CardContent>
        </Card>
      </Main>
    </Layout>
  );
};

export default NewSession;
