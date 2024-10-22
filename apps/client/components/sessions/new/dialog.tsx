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
};

const Dialog = ({ children, title, buttonText, buttonVariant }: Props) => {
  return (
    <UIDialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant || "outline"}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </UIDialog>
  );
};

export default Dialog;
