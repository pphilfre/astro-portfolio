import * as React from "react";

// Color definitions with explicit light/dark values for inline styles
const TAG_COLORS = [
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

// Keep the Tailwind-class version for backwards compat (used in filter dropdown)
export const getTagColor = (tag: string): { bg: string; text: string } => {
  const twColors = [
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
  return twColors[hashTag(tag) % twColors.length];
};

function useIsDark() {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

interface TagProps {
  tag: string;
  className?: string;
}

export function Tag({ tag, className = "" }: TagProps) {
  const isDark = useIsDark();
  const palette = TAG_COLORS[hashTag(tag) % TAG_COLORS.length];
  const theme = isDark ? palette.dark : palette.light;

  return (
    <span
      className={`px-2 py-1 text-xs rounded font-medium ${className}`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
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
