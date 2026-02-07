import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute, e as createAstro } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
import { g as getTagColor, T as Tag, a as getCollection } from '../chunks/Tag_R88B8Sr1.mjs';
/* empty css                                         */
import { c as cn, N as Navbar } from '../chunks/Navbar_KjT06Vy-.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { CheckIcon, ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
import { Checkbox as Checkbox$1 } from 'radix-ui';
export { renderers } from '../renderers.mjs';

function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Checkbox$1.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        Checkbox$1.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

function BlogFilter({ posts, allTags }) {
  const [selectedTags, setSelectedTags] = React.useState(/* @__PURE__ */ new Set());
  const [sortOrder, setSortOrder] = React.useState("newest");
  const [isTagsOpen, setIsTagsOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const tagsDropdownRef = React.useRef(null);
  const sortDropdownRef = React.useRef(null);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target)) {
        setIsTagsOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleTag = (tag) => {
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
    if (selectedTags.size > 0) {
      filtered = filtered.filter(
        (post) => post.tags.some((tag) => selectedTags.has(tag))
      );
    }
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.pubDate).valueOf();
      const dateB = new Date(b.pubDate).valueOf();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return filtered;
  }, [posts, selectedTags, sortOrder]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", ref: sortDropdownRef, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsSortOpen(!isSortOpen),
            className: "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition",
            children: [
              sortOrder === "newest" ? /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: sortOrder === "newest" ? "Newest" : "Oldest" }),
              /* @__PURE__ */ jsx(ChevronDown, { className: `w-3 h-3 transition-transform ${isSortOpen ? "rotate-180" : ""}` })
            ]
          }
        ),
        isSortOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-1 w-32 bg-popover border border-border rounded-md shadow-lg z-50 py-1", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSortOrder("newest");
                setIsSortOpen(false);
              },
              className: `w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${sortOrder === "newest" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx(ArrowDown, { className: "w-4 h-4" }),
                "Newest"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSortOrder("oldest");
                setIsSortOpen(false);
              },
              className: `w-full px-3 py-1.5 text-sm text-left flex items-center gap-2 hover:bg-muted transition ${sortOrder === "oldest" ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsx(ArrowUp, { className: "w-4 h-4" }),
                "Oldest"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", ref: tagsDropdownRef, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsTagsOpen(!isTagsOpen),
            className: "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-secondary border border-border hover:border-foreground/20 transition",
            children: [
              "Tags",
              selectedTags.size > 0 && /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 text-xs bg-accent text-accent-foreground rounded-full", children: selectedTags.size }),
              /* @__PURE__ */ jsx(ChevronDown, { className: `w-3 h-3 transition-transform ${isTagsOpen ? "rotate-180" : ""}` })
            ]
          }
        ),
        isTagsOpen && /* @__PURE__ */ jsxs("div", { className: "absolute top-full left-0 mt-1 w-44 bg-popover border border-border rounded-md shadow-lg z-50 p-2", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-1", children: allTags.map((tag) => {
            const color = getTagColor(tag);
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: "flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer transition",
                children: [
                  /* @__PURE__ */ jsx(
                    Checkbox,
                    {
                      checked: selectedTags.has(tag),
                      onCheckedChange: () => toggleTag(tag)
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-xs rounded ${color.bg} ${color.text}`, children: tag })
                ]
              },
              tag
            );
          }) }),
          selectedTags.size > 0 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTags(/* @__PURE__ */ new Set()),
              className: "w-full mt-2 pt-2 border-t border-border text-xs text-muted-foreground hover:text-foreground transition text-center",
              children: "Clear filters"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: filteredPosts.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No blog posts match your filters." }) : filteredPosts.map((post) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/blog/${post.slug}`,
        className: "block p-6 bg-secondary rounded-lg border border-border hover:border-foreground/20 hover:bg-secondary/80 transition group",
        children: [
          /* @__PURE__ */ jsx("time", { className: "text-sm text-muted-foreground", children: new Date(post.pubDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-2 mb-2 group-hover:text-accent transition", children: post.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: post.description }),
          post.tags && post.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: post.tags.map((tag) => /* @__PURE__ */ jsx(Tag, { tag }, tag)) })
        ]
      },
      post.slug
    )) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const allPosts = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate.toISOString(),
    tags: post.data.tags || []
  }));
  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><meta name="description" content="Cybersecurity blog by Freddie Philpot. Tutorials, writeups, and thoughts on Linux, cloud security, networking, and home lab projects."><title>Blog | Freddie Philpot</title><script>
			(function() {
				const theme = localStorage.getItem('theme') || 'system';
				const root = document.documentElement;
				if (theme === 'system') {
					const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					root.classList.add(systemDark ? 'dark' : 'light');
				} else {
					root.classList.add(theme);
				}
			})();
		<\/script><!-- PostHog Analytics --><script>
			!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init rs ls wi ns us ts ss capture calculateEventProperties vs register register_once register_for_session unregister unregister_for_session gs getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fs ds createPersonProfile setInternalOrTestUser ps Qr opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hs debug M cs getPageViewId captureTraceFeedback captureTraceMetric Kr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
			posthog.init('phc_kHZWuiUzdGkjQ7OvXfER2jygjMyTK9oyFfjVeg5vuAg', {
				api_host: 'https://us.i.posthog.com',
				defaults: '2025-11-30',
				person_profiles: 'identified_only',
			})
		<\/script>`, '</head> <body class="bg-background text-foreground min-h-screen"> ', ' <main class="pt-24 px-4 max-w-4xl mx-auto pb-16"> <h1 class="text-4xl md:text-5xl font-bold mb-4">Blog</h1> <p class="text-muted-foreground mb-8">Thoughts, tutorials, and writeups</p> ', " </main> </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), posts.length === 0 ? renderTemplate`<p class="text-muted-foreground">No blog posts yet. Check back soon!</p>` : renderTemplate`${renderComponent($$result, "BlogFilter", BlogFilter, { "client:load": true, "posts": posts, "allTags": allTags, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/BlogFilter.tsx", "client:component-export": "BlogFilter" })}`);
}, "/workspaces/astro-portfolio/src/pages/blog.astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
