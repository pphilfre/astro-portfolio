import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { ChevronDown, ArrowUp, ArrowDown, ArrowUpAZ, ArrowDownZA } from "lucide-react";

interface CTFPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  platform?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
}

interface CTFFilterProps {
  posts: CTFPost[];
}

// Difficulty order for sorting
const difficultyOrder: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
  insane: 4,
};

// Difficulty Badge Component with proper light/dark mode support
function DifficultyBadge({ difficulty, size = 'sm' }: { difficulty: string; size?: 'sm' | 'md' }) {
  const [isDark, setIsDark] = React.useState(false);
  
  React.useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const colors: Record<string, { light: { bg: string; text: string }; dark: { bg: string; text: string } }> = {
    easy: { light: { bg: '#16a34a', text: '#ffffff' }, dark: { bg: 'rgba(34, 197, 94, 0.3)', text: '#86efac' } },
    medium: { light: { bg: '#f59e0b', text: '#ffffff' }, dark: { bg: 'rgba(245, 158, 11, 0.3)', text: '#fcd34d' } },
    hard: { light: { bg: '#ea580c', text: '#ffffff' }, dark: { bg: 'rgba(249, 115, 22, 0.3)', text: '#fdba74' } },
    insane: { light: { bg: '#dc2626', text: '#ffffff' }, dark: { bg: 'rgba(239, 68, 68, 0.3)', text: '#fca5a5' } },
  };
  
  const color = colors[difficulty] || colors.easy;
  const theme = isDark ? color.dark : color.light;
  const padding = size === 'md' ? 'px-2 py-1' : 'px-2 py-0.5';
  
  return (
    <span 
      className={`${padding} text-xs rounded capitalize font-medium`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {difficulty}
    </span>
  );
}

const allDifficulties = ['easy', 'medium', 'hard', 'insane'] as const;

export function CTFFilter({ posts }: CTFFilterProps) {
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<Set<string>>(new Set());
  const [difficultySort, setDifficultySort] = React.useState<"easiest" | "hardest">("easiest");
  const [alphaSort, setAlphaSort] = React.useState<"a-z" | "z-a">("a-z");
  const [isDifficultyOpen, setIsDifficultyOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [isAlphaSortOpen, setIsAlphaSortOpen] = React.useState(false);
  const difficultyDropdownRef = React.useRef<HTMLDivElement>(null);
  const sortDropdownRef = React.useRef<HTMLDivElement>(null);
  const alphaSortDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target as Node)) {
        setIsDifficultyOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (alphaSortDropdownRef.current && !alphaSortDropdownRef.current.contains(event.target as Node)) {
        setIsAlphaSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(difficulty)) {
        next.delete(difficulty);
      } else {
        next.add(difficulty);
      }
      return next;
    });
  };

  const filteredPosts = React.useMemo(() => {
    let filtered = posts;
    
    // Filter by difficulty
    if (selectedDifficulties.size > 0) {
      filtered = filtered.filter((post) =>
        selectedDifficulties.has(post.difficulty)
      );
    }
    
    // Sort by difficulty first, then alphabetically within same difficulty
    filtered = [...filtered].sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty] || 0;
      const diffB = difficultyOrder[b.difficulty] || 0;
      const diffCompare = difficultySort === "easiest" ? diffA - diffB : diffB - diffA;
      
      // If same difficulty, sort alphabetically
      if (diffCompare === 0) {
        const alphaCompare = a.title.localeCompare(b.title);
        return alphaSort === "a-z" ? alphaCompare : -alphaCompare;
      }
      
      return diffCompare;
    });
    
    return filtered;
  }, [posts, selectedDifficulties, difficultySort, alphaSort]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        {/* Difficulty Sort Dropdown */}
        <div className="relative" ref={sortDropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition"
          >
            {difficultySort === "easiest" ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{difficultySort === "easiest" ? "Easiest First" : "Hardest First"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isSortOpen && (
            <div className="absolute top-full left-0 mt-1 w-36 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
              <button
                onClick={() => { setDifficultySort("easiest"); setIsSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${difficultySort === "easiest" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowUp className="w-4 h-4" />
                Easiest First
              </button>
              <button
                onClick={() => { setDifficultySort("hardest"); setIsSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${difficultySort === "hardest" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowDown className="w-4 h-4" />
                Hardest First
              </button>
            </div>
          )}
        </div>

        {/* Alphabetical Sort Dropdown */}
        <div className="relative" ref={alphaSortDropdownRef}>
          <button
            onClick={() => setIsAlphaSortOpen(!isAlphaSortOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition"
          >
            {alphaSort === "a-z" ? (
              <ArrowUpAZ className="w-4 h-4" />
            ) : (
              <ArrowDownZA className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{alphaSort === "a-z" ? "A-Z" : "Z-A"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isAlphaSortOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isAlphaSortOpen && (
            <div className="absolute top-full left-0 mt-1 w-28 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
              <button
                onClick={() => { setAlphaSort("a-z"); setIsAlphaSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${alphaSort === "a-z" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowUpAZ className="w-4 h-4" />
                A-Z
              </button>
              <button
                onClick={() => { setAlphaSort("z-a"); setIsAlphaSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${alphaSort === "z-a" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowDownZA className="w-4 h-4" />
                Z-A
              </button>
            </div>
          )}
        </div>

        {/* Difficulty Filter Dropdown */}
        <div className="relative" ref={difficultyDropdownRef}>
          <button
            onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition"
          >
            Difficulty
            {selectedDifficulties.size > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                {selectedDifficulties.size}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 transition-transform ${isDifficultyOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isDifficultyOpen && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-popover border border-border rounded-md shadow-lg z-50 p-2">
              <div className="space-y-1">
                {allDifficulties.map((difficulty) => {
                  return (
                    <label
                      key={difficulty}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer transition"
                    >
                      <Checkbox
                        checked={selectedDifficulties.has(difficulty)}
                        onCheckedChange={() => toggleDifficulty(difficulty)}
                      />
                      <DifficultyBadge difficulty={difficulty} />
                    </label>
                  );
                })}
              </div>
              {selectedDifficulties.size > 0 && (
                <button
                  onClick={() => setSelectedDifficulties(new Set())}
                  className="w-full mt-2 pt-2 border-t border-border text-xs text-muted-foreground hover:text-foreground transition text-center"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground">No CTF writeups match your filters.</p>
        ) : (
          filteredPosts.map((post) => {
            return (
              <a
                key={post.slug}
                href={`/ctf/${post.slug}`}
                className="block p-6 bg-secondary rounded-lg border border-border hover:border-foreground/20 hover:bg-secondary/80 transition group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DifficultyBadge difficulty={post.difficulty} size="md" />
                  {post.platform && (
                    <span className="text-sm text-muted-foreground">{post.platform}</span>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2 mb-2 group-hover:text-accent transition">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {post.description}
                </p>
                <time className="text-sm text-muted-foreground mt-3 block">
                  {new Date(post.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
