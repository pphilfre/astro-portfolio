import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import { getTagColor, Tag } from "./Tag";

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
      <div className="mb-8 p-4 bg-secondary rounded-lg border border-border">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Date Sort */}
          <div className="flex-shrink-0">
            <label className="text-sm font-medium mb-2 block">Sort by Date</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder("newest")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  sortOrder === "newest"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  sortOrder === "oldest"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Filter by Tags</label>
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => {
                const color = getTagColor(tag);
                return (
                  <label
                    key={tag}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedTags.has(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <span className={`px-2 py-0.5 text-xs rounded ${color.bg} ${color.text}`}>
                      {tag}
                    </span>
                  </label>
                );
              })}
            </div>
            {selectedTags.size > 0 && (
              <button
                onClick={() => setSelectedTags(new Set())}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition"
              >
                Clear filters
              </button>
            )}
          </div>
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