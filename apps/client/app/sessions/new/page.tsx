"use client";

import AddBuyinForm from "@/components/sessions/new/add-buyin-form";
import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewSessionPage = () => {
  return (
    <div dir="rtl" lang="he" className="font-sans container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-right"> סשיין חדש</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-right">טבלת BUYIN</CardTitle>
          </CardHeader>
          <CardContent>
            <BuyinTable />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-right">הוסף BUYIN</CardTitle>
          </CardHeader>
          <CardContent>
            <AddBuyinForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewSessionPage;
