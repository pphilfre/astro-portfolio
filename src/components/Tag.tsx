import * as React from "react";

// Generate consistent colors for tags (unsaturated/muted)
export const getTagColor = (tag: string): { bg: string; text: string } => {
  const colors = [
    { bg: "bg-rose-200/40 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-300" },
    { bg: "bg-blue-200/40 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
    { bg: "bg-green-200/40 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300" },
    { bg: "bg-purple-200/40 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
    { bg: "bg-amber-200/40 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300" },
    { bg: "bg-cyan-200/40 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-300" },
    { bg: "bg-pink-200/40 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-300" },
    { bg: "bg-indigo-200/40 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300" },
    { bg: "bg-teal-200/40 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300" },
    { bg: "bg-orange-200/40 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300" },
  ];
  
  // Hash the tag name to get a consistent color
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface TagProps {
  tag: string;
  className?: string;
}

export function Tag({ tag, className = "" }: TagProps) {
  const color = getTagColor(tag);
  return (
    <span className={`px-2 py-1 text-xs rounded ${color.bg} ${color.text} ${className}`}>
      {tag}
    </span>
  );
}

interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
