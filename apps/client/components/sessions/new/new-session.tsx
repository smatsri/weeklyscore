"use client";

import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Buttons, Title, Layout, Main } from "./components";

const NewSession = () => {
  return (
    <Layout>
      <Title title="סשיין חדש" />
      <Main>
        <Card>
          <CardHeader>
            <Buttons />
          </CardHeader>
          <CardContent>
            <BuyinTable />
          </CardContent>
        </Card>
      </Main>
    </Layout>
  );
};

export default NewSession;
