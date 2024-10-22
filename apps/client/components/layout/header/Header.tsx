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
import Link from "next/link";
import Image from "next/image";

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
          <div className="flex items-center">
            <div className="flex-shrink-0 ml-4">
              <Image
                src="/img/logo.png?height=40&width=40"
                alt="לוגו"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary/80 text-sm font-medium mr-4"
            >
              דאשבורד
            </Link>
            <Link
              href="/sessions"
              className="text-primary hover:text-primary/80 text-sm font-medium mr-4"
            >
              סשיינים
            </Link>
          </div>
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
