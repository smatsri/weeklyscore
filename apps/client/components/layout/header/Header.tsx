import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

type Props = {
  userName: string | null;
  onSignOut: () => void;
  onSignIn: () => void;
};

export default function Header({ userName, onSignOut, onSignIn }: Props) {
  return (
    <header className="bg-background border-b" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/dashboard"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            דאשבורד
          </Link>
          <div className="flex items-center">
            {userName ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>החשבון שלי</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onSignOut}>התנתק</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={onSignIn}>
                התחבר
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
