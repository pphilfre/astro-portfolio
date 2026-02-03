import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinkStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors";
const navLinkActiveStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-transparent transition-colors";

type Theme = "light" | "dark" | "system";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [theme, setTheme] = useState<Theme>("system");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem("theme") as Theme | null;
      if (!currentTheme || currentTheme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Close theme menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-theme-menu]")) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.remove("light", "dark");
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setIsThemeMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getThemeIcon = () => {
    if (theme === "light") {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else if (theme === "dark") {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={isActive("/") ? navLinkActiveStyle : navLinkStyle}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/about"
              className={isActive("/about") ? navLinkActiveStyle : navLinkStyle}
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className={`bg-transparent hover:text-foreground hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground ${isActive("/projects") ? "text-foreground" : "text-muted-foreground"}`}>
              Projects
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-2 p-2">
                <li>
                  <NavigationMenuLink href="/projects" className="block p-2 rounded hover:bg-muted transition-colors group">
                    <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">All Projects</div>
                    <p className="text-muted-foreground/70 text-xs">
                      View all my security projects
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/projects/ctf" className="block p-2 rounded hover:bg-muted transition-colors group">
                    <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">CTF Writeups</div>
                    <p className="text-muted-foreground/70 text-xs">
                      Capture The Flag challenges & solutions
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/projects/tools" className="block p-2 rounded hover:bg-muted transition-colors group">
                    <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Security Tools</div>
                    <p className="text-muted-foreground/70 text-xs">
                      Custom tools & scripts I've built
                    </p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/blog"
              className={isActive("/blog") ? navLinkActiveStyle : navLinkStyle}
            >
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/certifications"
              className={isActive("/certifications") ? navLinkActiveStyle : navLinkStyle}
            >
              Achievements
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/contact"
              className={isActive("/contact") ? navLinkActiveStyle : navLinkStyle}
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Theme Toggle */}
          <NavigationMenuItem>
            <div className="relative ml-2" data-theme-menu>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThemeMenuOpen(!isThemeMenuOpen);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {getThemeIcon()}
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-popover backdrop-blur-md rounded-md border border-border shadow-lg py-1 z-50">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "light" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "dark" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "system" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    System
                  </button>
                </div>
              )}
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
