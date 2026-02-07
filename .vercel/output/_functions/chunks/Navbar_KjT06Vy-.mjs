import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { XIcon, MenuIcon, ChevronDownIcon, Download } from 'lucide-react';
import { Dialog } from 'radix-ui';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-transparent data-[state=open]:text-foreground data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent outline-none transition-colors"
);
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover backdrop-blur-md text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-colors outline-none [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}

function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      Dialog.Content,
      {
        "data-slot": "sheet-content",
        onOpenAutoFocus: (e) => e.preventDefault(),
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-lg",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}

const navLinkStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors";
const navLinkActiveStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-transparent transition-colors";
const mobileNavLinkStyle = "flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors";
const mobileNavLinkActiveStyle = "flex items-center px-4 py-3 text-base font-medium text-foreground bg-muted rounded-md transition-colors";
const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [theme, setTheme] = useState("system");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsClicked, setIsProjectsClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const projectsRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem("theme");
      if (!currentTheme || currentTheme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest("[data-theme-menu]")) {
        setIsThemeMenuOpen(false);
      }
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
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("sheet-open");
    } else {
      document.documentElement.classList.remove("sheet-open");
    }
    return () => {
      document.documentElement.classList.remove("sheet-open");
    };
  }, [isMobileMenuOpen]);
  const applyTheme = (newTheme) => {
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
  const handleThemeChange = async (newTheme, event) => {
    const button = event?.currentTarget;
    const buttonRect = button?.getBoundingClientRect();
    let targetTheme;
    if (newTheme === "system") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      targetTheme = newTheme;
    }
    const currentActualTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    if (buttonRect && targetTheme !== currentActualTheme && document.startViewTransition) {
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;
      document.documentElement.style.setProperty("--transition-x", `${centerX}px`);
      document.documentElement.style.setProperty("--transition-y", `${centerY}px`);
      document.documentElement.classList.add(`theme-transition-${targetTheme}`);
      const transition = document.startViewTransition(() => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      });
      transition.finished.then(() => {
        document.documentElement.classList.remove(`theme-transition-${targetTheme}`);
      });
    } else {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    }
    setIsThemeMenuOpen(false);
  };
  const isActive = (path) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };
  const handleProjectsClick = (e) => {
    e.stopPropagation();
    if (isProjectsClicked) {
      setIsProjectsOpen(false);
      setIsProjectsClicked(false);
    } else {
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
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) });
    } else if (theme === "dark") {
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) });
    } else {
      return /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) });
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 bg-background/80 backdrop-blur-md border-b border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "md:hidden absolute left-4", children: /* @__PURE__ */ jsxs(Sheet, { open: isMobileMenuOpen, onOpenChange: setIsMobileMenuOpen, children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
          "aria-label": "Open menu",
          children: /* @__PURE__ */ jsx(MenuIcon, { className: "h-5 w-5" })
        }
      ) }),
      /* @__PURE__ */ jsxs(SheetContent, { side: "left", className: "w-[280px] p-0", children: [
        /* @__PURE__ */ jsx(SheetHeader, { className: "border-b border-border", children: /* @__PURE__ */ jsx(SheetTitle, { children: "Menu" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col py-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: isActive("/") ? mobileNavLinkActiveStyle : mobileNavLinkStyle,
              onClick: () => setIsMobileMenuOpen(false),
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/about",
              className: isActive("/about") ? mobileNavLinkActiveStyle : mobileNavLinkStyle,
              onClick: () => setIsMobileMenuOpen(false),
              children: "About"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsMobileProjectsOpen(!isMobileProjectsOpen),
                className: `w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-md ${isActive("/projects") ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                children: [
                  "Projects",
                  /* @__PURE__ */ jsx(
                    ChevronDownIcon,
                    {
                      className: `h-4 w-4 transition-transform duration-200 ${isMobileProjectsOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            isMobileProjectsOpen && /* @__PURE__ */ jsxs("div", { className: "pl-4 py-1 space-y-1", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/projects",
                  className: "block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors",
                  onClick: () => setIsMobileMenuOpen(false),
                  children: "All Projects"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/projects/ctf",
                  className: "block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors",
                  onClick: () => setIsMobileMenuOpen(false),
                  children: "CTF Writeups"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/projects/tools",
                  className: "block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors",
                  onClick: () => setIsMobileMenuOpen(false),
                  children: "Security Tools"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/blog",
              className: isActive("/blog") ? mobileNavLinkActiveStyle : mobileNavLinkStyle,
              onClick: () => setIsMobileMenuOpen(false),
              children: "Blog"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/certifications",
              className: isActive("/certifications") ? mobileNavLinkActiveStyle : mobileNavLinkStyle,
              onClick: () => setIsMobileMenuOpen(false),
              children: "Achievements"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contact",
              className: isActive("/contact") ? mobileNavLinkActiveStyle : mobileNavLinkStyle,
              onClick: () => setIsMobileMenuOpen(false),
              children: "Contact"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 px-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-2 uppercase tracking-wider", children: "Theme" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleThemeChange("light"),
                  className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "light" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleThemeChange("dark"),
                  className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "dark" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleThemeChange("system"),
                  className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors ${theme === "system" ? "border-foreground text-foreground bg-muted" : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(NavigationMenu, { className: "hidden md:flex", children: /* @__PURE__ */ jsxs(NavigationMenuList, { children: [
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: "/",
          className: isActive("/") ? navLinkActiveStyle : navLinkStyle,
          children: "Home"
        }
      ) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: "/about",
          className: isActive("/about") ? navLinkActiveStyle : navLinkStyle,
          children: "About"
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative",
          "data-projects-menu": true,
          ref: projectsRef,
          onMouseEnter: handleProjectsMouseEnter,
          onMouseLeave: handleProjectsMouseLeave,
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleProjectsClick,
                className: `inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${isActive("/projects") ? "text-foreground" : "text-muted-foreground"}`,
                children: [
                  "Projects",
                  /* @__PURE__ */ jsx(
                    ChevronDownIcon,
                    {
                      className: `ml-1 h-3 w-3 transition-transform duration-200 ${isProjectsOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            isProjectsOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 mt-1.5 w-[300px] rounded-md border border-border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95", children: /* @__PURE__ */ jsxs("ul", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/projects", className: "block p-2 rounded hover:bg-muted transition-colors group", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-muted-foreground group-hover:text-foreground transition-colors", children: "All Projects" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 text-xs", children: "View all my security projects" })
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/projects/ctf", className: "block p-2 rounded hover:bg-muted transition-colors group", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-muted-foreground group-hover:text-foreground transition-colors", children: "CTF Writeups" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 text-xs", children: "Capture The Flag challenges & solutions" })
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "/projects/tools", className: "block p-2 rounded hover:bg-muted transition-colors group", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-muted-foreground group-hover:text-foreground transition-colors", children: "Security Tools" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground/70 text-xs", children: "Custom tools & scripts I've built" })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: "/blog",
          className: isActive("/blog") ? navLinkActiveStyle : navLinkStyle,
          children: "Blog"
        }
      ) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: "/certifications",
          className: isActive("/certifications") ? navLinkActiveStyle : navLinkStyle,
          children: "Achievements"
        }
      ) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: "/contact",
          className: isActive("/contact") ? navLinkActiveStyle : navLinkStyle,
          children: "Contact"
        }
      ) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/cv.pdf",
          download: true,
          className: "inline-flex h-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 text-sm font-medium transition-colors gap-2",
          "aria-label": "Download CV",
          children: [
            /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden lg:inline", children: "CV" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxs("div", { className: "relative ml-2", "data-theme-menu": true, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setIsThemeMenuOpen(!isThemeMenuOpen);
            },
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            "aria-label": "Toggle theme",
            children: getThemeIcon()
          }
        ),
        isThemeMenuOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-36 bg-popover backdrop-blur-md rounded-md border border-border shadow-lg py-1 z-50", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("light", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "light" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }),
                "Light"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("dark", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "dark" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }),
                "Dark"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("system", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "system" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
                "System"
              ]
            }
          )
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute right-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/cv.pdf",
          download: true,
          className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
          "aria-label": "Download CV",
          children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { "data-theme-menu": true, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setIsThemeMenuOpen(!isThemeMenuOpen);
            },
            className: "inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            "aria-label": "Toggle theme",
            children: getThemeIcon()
          }
        ),
        isThemeMenuOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-36 bg-popover backdrop-blur-md rounded-md border border-border shadow-lg py-1 z-50", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("light", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "light" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) }),
                "Light"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("dark", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "dark" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }),
                "Dark"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: (e) => handleThemeChange("system", e),
              className: `w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors ${theme === "system" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
                "System"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
};

export { Navbar as N, Sheet as S, SheetContent as a, SheetHeader as b, cn as c, SheetTitle as d, SheetDescription as e, SheetFooter as f, SheetClose as g };
