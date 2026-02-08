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

// Difficulty colors
const getDifficultyColor = (difficulty: string): { bg: string; text: string } => {
  switch (difficulty) {
    case 'easy':
      return { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-300" };
    case 'medium':
      return { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-800 dark:text-amber-300" };
    case 'hard':
      return { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-800 dark:text-orange-300" };
    case 'insane':
      return { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-300" };
    default:
      return { bg: "bg-gray-100 dark:bg-gray-900/30", text: "text-gray-800 dark:text-gray-300" };
  }
};

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
                  const color = getDifficultyColor(difficulty);
                  return (
                    <label
                      key={difficulty}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer transition"
                    >
                      <Checkbox
                        checked={selectedDifficulties.has(difficulty)}
                        onCheckedChange={() => toggleDifficulty(difficulty)}
                      />
                      <span className={`px-2 py-0.5 text-xs rounded capitalize ${color.bg} ${color.text}`}>
                        {difficulty}
                      </span>
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
            const difficultyColor = getDifficultyColor(post.difficulty);
            return (
              <a
                key={post.slug}
                href={`/ctf/${post.slug}`}
                className="block p-6 bg-secondary rounded-lg border border-border hover:border-foreground/20 hover:bg-secondary/80 transition group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-xs rounded capitalize ${difficultyColor.bg} ${difficultyColor.text}`}>
                    {post.difficulty}
                  </span>
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
