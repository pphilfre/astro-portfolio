import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinkStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-transparent transition-colors";
const navLinkActiveStyle = "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-transparent transition-colors";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 bg-black/30 backdrop-blur-md border-b border-white/10">
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
            <NavigationMenuTrigger className={`bg-transparent hover:text-white hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white ${isActive("/projects") ? "text-white" : "text-gray-400"}`}>
              Projects
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-2 p-2 bg-black/90 backdrop-blur-md border-none rounded-md">
                <li>
                  <NavigationMenuLink href="/projects" className="block p-2 rounded hover:bg-transparent transition-colors group">
                    <div className="font-medium text-gray-400 group-hover:text-white transition-colors">All Projects</div>
                    <p className="text-gray-500 text-xs">
                      View all my security projects
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/projects/ctf" className="block p-2 rounded hover:bg-transparent transition-colors group">
                    <div className="font-medium text-gray-400 group-hover:text-white transition-colors">CTF Writeups</div>
                    <p className="text-gray-500 text-xs">
                      Capture The Flag challenges & solutions
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/projects/tools" className="block p-2 rounded hover:bg-transparent transition-colors group">
                    <div className="font-medium text-gray-400 group-hover:text-white transition-colors">Security Tools</div>
                    <p className="text-gray-500 text-xs">
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
              Certifications
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
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
