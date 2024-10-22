import AddBuyinForm from "@/components/sessions/new/add-buyin-form";
import AddPlayerForm from "@/components/sessions/new/add-player-form";
import BuyinTable from "@/components/sessions/new/buyin-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dialog from "./dialog";

export const Buttons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-2 sm:mb-0 order-2 sm:order-1">
      <Dialog
        buttonText="הוסף BUYIN"
        title="הוסף BUYIN"
        buttonVariant="outline"
      >
        <AddBuyinForm />
      </Dialog>

      <Dialog buttonText="הוסף שחקן" title="הוסף שחקן" buttonVariant="outline">
        <AddPlayerForm />
      </Dialog>
    </div>
  );
};

export const Title = ({ title }: { title: string }) => (
  <h1 className="text-3xl font-bold mb-6 text-right">{title}</h1>
);
export const Main = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-6">{children}</div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="font-sans container mx-auto px-4 py-8">{children}</div>
);
