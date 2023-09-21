import DarkModeToggle from "../theme/DarkModeToggle";

export default function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between p-2">
      <h1 className="text-lg font-bold text-primary md:text-2xl">Chess</h1>
      <DarkModeToggle />
    </header>
  );
}
