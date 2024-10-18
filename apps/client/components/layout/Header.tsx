export default function Header() {
  return (
    <header className="flex gap-4">
      <h1 className="">
        <a href="/">פוקר</a>
      </h1>
      <nav className="flex-grow m-0 flex items-end">
        <ul className="flex gap-4">
          <li>
            <a href="/dashboard">דאשבורד</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
