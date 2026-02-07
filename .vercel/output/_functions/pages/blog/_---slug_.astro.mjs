import { c as createComponent, r as renderTemplate, a as renderComponent, d as addAttribute, b as renderHead, e as createAstro } from '../../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
import { b as TagList, a as getCollection } from '../../chunks/Tag_R88B8Sr1.mjs';
/* empty css                                            */
import { N as Navbar } from '../../chunks/Navbar_KjT06Vy-.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  const blogEntries = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content } = await entry.render();
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><meta name="description"', "><title>", ` | CyberSec Portfolio</title><script>
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
    <\/script>`, '</head> <body class="bg-background text-foreground min-h-screen"> ', ' <main class="pt-24 px-4 max-w-4xl mx-auto pb-16"> <article> <header class="mb-8"> <a href="/blog" class="text-muted-foreground hover:text-foreground transition mb-4 inline-block">\n\u2190 Back to Blog\n</a> <h1 class="text-4xl md:text-5xl font-bold mb-4">', '</h1> <div class="flex items-center gap-4 text-muted-foreground"> <time', "> ", " </time> </div> ", ' </header> <div class="prose max-w-none"> ', " </div> </article> </main> </body></html>"])), addAttribute(Astro2.generator, "content"), addAttribute(entry.data.description, "content"), entry.data.title, renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), entry.data.title, addAttribute(entry.data.pubDate.toISOString(), "datetime"), entry.data.pubDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }), entry.data.tags && entry.data.tags.length > 0 && renderTemplate`${renderComponent($$result, "TagList", TagList, { "tags": entry.data.tags, "className": "mt-4" })}`, renderComponent($$result, "Content", Content, {}));
}, "/workspaces/astro-portfolio/src/pages/blog/[...slug].astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
