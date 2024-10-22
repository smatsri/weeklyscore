"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
  title: string;
  buttonText: string;
  buttonVariant?: "outline" | "default";
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Dialog = ({
  children,
  title,
  buttonText,
  buttonVariant,
  open,
  setOpen,
}: Props) => {
  return (
    <UIDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant || "outline"}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </UIDialog>
  );
};

export default Dialog;
