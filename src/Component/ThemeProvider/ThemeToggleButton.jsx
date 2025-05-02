// import { CiLight, RxMoon } from 'react-icons/all';
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-1.5 right-12 z-50 p-1.5 bg-blue-500 text-primary-content rounded-full shadow-lg hover:bg-primary-focus transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <CiLight size={18} /> : <FaMoon size={18} />}
    </button>
  );
};
