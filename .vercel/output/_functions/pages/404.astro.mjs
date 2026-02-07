import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute, e as createAstro } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
/* empty css                                         */
import { N as Navbar } from '../chunks/Navbar_KjT06Vy-.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo } from 'react';
export { renderers } from '../renderers.mjs';

const FOUR_PATTERN = [
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0]
];
const ZERO_PATTERN = [
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 0]
];
function create404Pattern() {
  const rows = 11;
  const pattern = [];
  for (let row = 0; row < rows; row++) {
    pattern.push([
      ...FOUR_PATTERN[row],
      0,
      0,
      ...ZERO_PATTERN[row],
      0,
      0,
      ...FOUR_PATTERN[row]
    ]);
  }
  return pattern;
}
const PATTERN_404 = create404Pattern();
const PATTERN_WIDTH = 25;
const PATTERN_HEIGHT = 11;
const GRID_COLS = 50;
const GRID_ROWS = 22;
function DotMatrix404() {
  const gridContent = useMemo(() => {
    const startRow = Math.floor((GRID_ROWS - PATTERN_HEIGHT) / 2);
    const startCol = Math.floor((GRID_COLS - PATTERN_WIDTH) / 2);
    const dots = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const patternRow = row - startRow;
        const patternCol = col - startCol;
        let is404 = false;
        if (patternRow >= 0 && patternRow < PATTERN_HEIGHT && patternCol >= 0 && patternCol < PATTERN_WIDTH) {
          is404 = PATTERN_404[patternRow][patternCol] === 1;
        }
        const delay = row * 0.04 + col * 0.02;
        dots.push(
          /* @__PURE__ */ jsx(
            "div",
            {
              className: is404 ? "dot dot-main" : "dot dot-bg",
              style: { animationDelay: `${delay}s` }
            },
            `${row}-${col}`
          )
        );
      }
    }
    return dots;
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "dot-matrix-container", children: [
    /* @__PURE__ */ jsx("div", { className: "dot-grid", children: gridContent }),
    /* @__PURE__ */ jsx("style", { children: `
        .dot-matrix-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        
        .dot-grid {
          display: grid;
          grid-template-columns: repeat(${GRID_COLS}, 1fr);
          grid-template-rows: repeat(${GRID_ROWS}, 1fr);
          gap: 4px;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
        
        @media (min-width: 640px) {
          .dot-grid {
            gap: 6px;
            padding: 16px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-grid {
            gap: 8px;
          }
        }
        
        .dot {
          border-radius: 50%;
          margin: auto;
          will-change: transform, opacity;
        }
        
        .dot-main {
          width: 10px;
          height: 10px;
          background-color: #171717;
          animation: pulse404 2.5s ease-in-out infinite;
        }
        
        .dot-bg {
          width: 6px;
          height: 6px;
          background-color: rgba(23, 23, 23, 0.35);
          animation: waveBg 4s ease-in-out infinite;
        }
        
        @media (min-width: 640px) {
          .dot-main {
            width: 12px;
            height: 12px;
          }
          .dot-bg {
            width: 8px;
            height: 8px;
          }
        }
        
        @media (min-width: 768px) {
          .dot-main {
            width: 16px;
            height: 16px;
          }
          .dot-bg {
            width: 10px;
            height: 10px;
          }
        }
        
        /* Dark mode colors */
        :root.dark .dot-main {
          background-color: #ffffff;
        }
        
        :root.dark .dot-bg {
          background-color: rgba(255, 255, 255, 0.15);
        }
        
        @keyframes pulse404 {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
          }
        }
        
        @keyframes waveBg {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.5);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1);
          }
        }
      ` })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"', `><meta name="description" content="Page not found - Freddie Philpot Portfolio"><title>404 - Page Not Found | Freddie Philpot</title><script>
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
		<\/script>`, '</head> <body class="bg-background text-foreground min-h-screen overflow-hidden"> ', " <!-- Full page dot matrix background --> ", ` <!-- Content overlay - Left aligned --> <main class="fixed inset-0 z-10 pointer-events-none"> <!-- Text content - top left --> <div class="absolute top-24 sm:top-32 left-6 sm:left-12 lg:left-20 pointer-events-auto"> <div class="space-y-6"> <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border"> <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span> <span class="text-sm font-mono uppercase tracking-wider text-muted-foreground">Error 404</span> </div> <div class="space-y-4"> <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"> <span class="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
Page not found
</span> </h1> <p class="text-muted-foreground text-base sm:text-lg max-w-sm bg-background/90 backdrop-blur-sm px-4 py-3 rounded-xl">
The page you're looking for doesn't exist or has been moved.
</p> </div> </div> </div> <!-- Home button - bottom left --> <div class="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 lg:left-20 pointer-events-auto"> <a href="/" class="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity group"> <span class="font-mono uppercase tracking-wider">Back to Home</span> <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </main> </body></html>`])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), renderComponent($$result, "DotMatrix404", DotMatrix404, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/DotMatrix404.tsx", "client:component-export": "default" }));
}, "/workspaces/astro-portfolio/src/pages/404.astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
