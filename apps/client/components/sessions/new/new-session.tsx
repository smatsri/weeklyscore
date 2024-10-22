"use client";

import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Title, Layout, Main } from "./layout";
import { Api, useNewSession } from "./model";
import { Buttons } from "./buttons";

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
