"use client";

import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Buttons, Title, Layout, Main } from "./components";
import { Api, useNewSession } from "./model";

// Mock data for users and amounts

type Props = {
  api: Api;
};
const NewSession = ({ api }: Props) => {
  const { addBuyin, addPlayer, buyins, players } = useNewSession(api);
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
