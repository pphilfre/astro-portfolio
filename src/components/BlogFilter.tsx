import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { getTagColor, Tag } from "./Tag";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

// Inline-style color lookup for filter dropdown badges
const FILTER_COLORS = [
  { light: { bg: "rgba(251,113,133,0.25)", text: "#be123c" }, dark: { bg: "rgba(136,19,55,0.3)", text: "#fda4af" } },
  { light: { bg: "rgba(147,197,253,0.25)", text: "#1d4ed8" }, dark: { bg: "rgba(30,58,138,0.3)", text: "#93c5fd" } },
  { light: { bg: "rgba(134,239,172,0.25)", text: "#15803d" }, dark: { bg: "rgba(20,83,45,0.3)", text: "#86efac" } },
  { light: { bg: "rgba(216,180,254,0.25)", text: "#7e22ce" }, dark: { bg: "rgba(88,28,135,0.3)", text: "#d8b4fe" } },
  { light: { bg: "rgba(253,230,138,0.25)", text: "#b45309" }, dark: { bg: "rgba(120,53,15,0.3)", text: "#fcd34d" } },
  { light: { bg: "rgba(165,243,252,0.25)", text: "#0e7490" }, dark: { bg: "rgba(22,78,99,0.3)", text: "#a5f3fc" } },
  { light: { bg: "rgba(249,168,212,0.25)", text: "#be185d" }, dark: { bg: "rgba(131,24,67,0.3)", text: "#f9a8d4" } },
  { light: { bg: "rgba(199,210,254,0.25)", text: "#4338ca" }, dark: { bg: "rgba(49,46,129,0.3)", text: "#c7d2fe" } },
  { light: { bg: "rgba(153,246,228,0.25)", text: "#0f766e" }, dark: { bg: "rgba(19,78,74,0.3)", text: "#99f6e4" } },
  { light: { bg: "rgba(253,186,116,0.25)", text: "#c2410c" }, dark: { bg: "rgba(124,45,18,0.3)", text: "#fdba74" } },
];

function hashTag(tag: string): number {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getFilterTagStyle(tag: string, isDark: boolean) {
  const palette = FILTER_COLORS[hashTag(tag) % FILTER_COLORS.length];
  const theme = isDark ? palette.dark : palette.light;
  return { backgroundColor: theme.bg, color: theme.text };
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
}

interface BlogFilterProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">("newest");
  const [isTagsOpen, setIsTagsOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const tagsDropdownRef = React.useRef<HTMLDivElement>(null);
  const sortDropdownRef = React.useRef<HTMLDivElement>(null);

  // Detect dark mode
  React.useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const filteredPosts = React.useMemo(() => {
    let filtered = posts;
    
    // Filter by tags
    if (selectedTags.size > 0) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => selectedTags.has(tag))
      );
    }
    
    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.pubDate).valueOf();
      const dateB = new Date(b.pubDate).valueOf();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [posts, selectedTags, sortOrder]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-6 flex items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative" ref={sortDropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition"
          >
            {sortOrder === "newest" ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isSortOpen && (
            <div className="absolute top-full left-0 mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
              <button
                onClick={() => { setSortOrder("newest"); setIsSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${sortOrder === "newest" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowDown className="w-4 h-4" />
                Newest
              </button>
              <button
                onClick={() => { setSortOrder("oldest"); setIsSortOpen(false); }}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${sortOrder === "oldest" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <ArrowUp className="w-4 h-4" />
                Oldest
              </button>
            </div>
          )}
        </div>

        {/* Tag Filter Dropdown */}
        <div className="relative" ref={tagsDropdownRef}>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition"
          >
            Tags
            {selectedTags.size > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                {selectedTags.size}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 transition-transform ${isTagsOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isTagsOpen && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-popover border border-border rounded-md shadow-lg z-50 p-2">
              <div className="space-y-1">
                {allTags.map((tag) => {
                  const style = getFilterTagStyle(tag, isDark);
                  return (
                    <label
                      key={tag}
                      className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer transition"
                    >
                      <Checkbox
                        checked={selectedTags.has(tag)}
                        onCheckedChange={() => toggleTag(tag)}
                      />
                      <span
                        className="px-2 py-0.5 text-xs rounded font-medium"
                        style={style}
                      >
                        {tag}
                      </span>
                    </label>
                  );
                })}
              </div>
              {selectedTags.size > 0 && (
                <button
                  onClick={() => setSelectedTags(new Set())}
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
          <p className="text-muted-foreground">No blog posts match your filters.</p>
        ) : (
          filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-secondary rounded-lg border border-border hover:border-foreground/20 hover:bg-secondary/80 transition group"
            >
              <time className="text-sm text-muted-foreground">
                {new Date(post.pubDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h2 className="text-xl font-semibold mt-2 mb-2 group-hover:text-accent transition">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </a>
          ))
        )}
      </div>
    </div>
  );
}