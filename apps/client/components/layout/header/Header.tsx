import Link from "next/link";
import UserLink from "./UserLink";

type Props = {
  userName: string | null;
  onSignOut: () => void;
  onSignIn: () => void;
};

const Header = ({ userName, onSignOut, onSignIn }: Props) => {
  return (
    <header className="flex gap-4">
      <h1 className="">
        <Link href="/">פוקר</Link>
      </h1>
      <nav className="flex-grow m-0 flex items-end">
        <ul className="flex gap-4">
          <li>
            <Link href="/dashboard">דאשבורד</Link>
          </li>
          <li>
            <UserLink
              userName={userName}
              onSignIn={onSignIn}
              onSignOut={onSignOut}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
