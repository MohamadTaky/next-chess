import DarkModeToggle from "../theme/DarkModeToggle";
import { cookies } from "next/headers";

export default function Header() {
  const isDarkMode = !!cookies().get("dark");
  return (
    <header className="container mx-auto flex items-center justify-between p-2">
      <h1 className="text-lg font-bold text-primary md:text-2xl">Chess</h1>
      <DarkModeToggle darkMode={isDarkMode} />
    </header>
  );
}
