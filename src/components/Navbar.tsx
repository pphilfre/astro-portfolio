import { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronDownIcon, MenuIcon } from "lucide-react";

const navLinkStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors";
const navLinkActiveStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-transparent transition-colors";

const mobileNavLinkStyle = "flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors";
const mobileNavLinkActiveStyle = "flex items-center px-4 py-3 text-base font-medium text-foreground bg-muted rounded-md transition-colors";

type Theme = "light" | "dark" | "system";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [theme, setTheme] = useState<Theme>("system");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      // Close projects dropdown when clicking outside
      if (!target.closest("[data-projects-menu]")) {
        setIsProjectsOpen(false);
        setIsProjectsClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("click", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
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

  // Projects dropdown handlers
  const handleProjectsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProjectsClicked) {
      // If already clicked open, close it
      setIsProjectsOpen(false);
      setIsProjectsClicked(false);
    } else {
      // Click to open permanently
      setIsProjectsOpen(true);
      setIsProjectsClicked(true);
    }
  };

  const handleProjectsMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (!isProjectsClicked) {
      setIsProjectsOpen(true);
    }
  };

  const handleProjectsMouseLeave = () => {
    if (!isProjectsClicked) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsProjectsOpen(false);
      }, 150);
    }
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
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute left-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col py-4">
              <a
                href="/"
                className={isActive("/") ? mobileNavLinkActiveStyle : mobileNavLinkStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/about"
                className={isActive("/about") ? mobileNavLinkActiveStyle : mobileNavLinkStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              
              {/* Mobile Projects Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-md ${isActive("/projects") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                >
                  Projects
                  <ChevronDownIcon 
                    className={`h-4 w-4 transition-transform duration-200 ${isMobileProjectsOpen ? "rotate-180" : ""}`} 
                  />
                </button>
                {isMobileProjectsOpen && (
                  <div className="pl-4 py-1 space-y-1">
                    <a
                      href="/projects"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      All Projects
                    </a>
                    <a
                      href="/projects/ctf"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      CTF Writeups
                    </a>
                    <a
                      href="/projects/tools"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Security Tools
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/blog"
                className={isActive("/blog") ? mobileNavLinkActiveStyle : mobileNavLinkStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/certifications"
                className={isActive("/certifications") ? mobileNavLinkActiveStyle : mobileNavLinkStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Achievements
              </a>
              <a
                href="/contact"
                className={isActive("/contact") ? mobileNavLinkActiveStyle : mobileNavLinkStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              {/* Mobile Theme Selector */}
              <div className="mt-4 px-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Theme</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "light" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "dark" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "system" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
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

          {/* Custom Projects dropdown with click/hover support */}
          <div 
            className="relative"
            data-projects-menu
            ref={projectsRef}
            onMouseEnter={handleProjectsMouseEnter}
            onMouseLeave={handleProjectsMouseLeave}
          >
            <button
              onClick={handleProjectsClick}
              className={`inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${isActive("/projects") ? "text-foreground" : "text-muted-foreground"}`}
            >
              Projects
              <ChevronDownIcon 
                className={`ml-1 h-3 w-3 transition-transform duration-200 ${isProjectsOpen ? "rotate-180" : ""}`} 
              />
            </button>
            
            {isProjectsOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-[300px] rounded-md border border-border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95">
                <ul className="grid gap-2">
                  <li>
                    <a href="/projects" className="block p-2 rounded hover:bg-muted transition-colors group">
                      <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">All Projects</div>
                      <p className="text-muted-foreground/70 text-xs">
                        View all my security projects
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/projects/ctf" className="block p-2 rounded hover:bg-muted transition-colors group">
                      <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">CTF Writeups</div>
                      <p className="text-muted-foreground/70 text-xs">
                        Capture The Flag challenges & solutions
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/projects/tools" className="block p-2 rounded hover:bg-muted transition-colors group">
                      <div className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">Security Tools</div>
                      <p className="text-muted-foreground/70 text-xs">
                        Custom tools & scripts I've built
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

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

      {/* Mobile Theme Toggle (visible on right side on mobile) */}
      <div className="md:hidden absolute right-4" data-theme-menu>
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
    </nav>
  );
};

export default Navbar;
