"use client";

// Third-Party =====> next-themes
import { useTheme } from "next-themes";
// Icons
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  // ################### NEXT-THEMES HOOKS ###################
  const { setTheme } = useTheme();

  return (
    <div>
      <Sun
        className="icon stroke-orange-400 hover:fill-orange-400 dark:hidden"
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="icon hidden dark:block"
        onClick={() => setTheme("light")}
      />
    </div>
  );
};

export default ThemeSwitcher;
