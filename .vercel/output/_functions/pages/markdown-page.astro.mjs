import { c as createComponent, r as renderTemplate, i as renderSlot, b as renderHead, e as createAstro, a as renderComponent, u as unescapeHTML } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Main = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Main;
  const { content } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><title>', `</title><!-- PostHog Analytics --><script>
			!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init rs ls wi ns us ts ss capture calculateEventProperties vs register register_once register_for_session unregister unregister_for_session gs getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fs ds createPersonProfile setInternalOrTestUser ps Qr opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hs debug M cs getPageViewId captureTraceFeedback captureTraceMetric Kr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
			posthog.init('phc_kHZWuiUzdGkjQ7OvXfER2jygjMyTK9oyFfjVeg5vuAg', {
				api_host: 'https://us.i.posthog.com',
				defaults: '2025-11-30',
				person_profiles: 'identified_only',
			})
		<\/script>`, "</head> <body> ", " </body></html>"])), content.title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/workspaces/astro-portfolio/src/layouts/main.astro", void 0);

const html = () => "<div class=\"grid place-items-center h-screen content-center\">\n <div class=\"py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md\">\n  Tailwind classes also work in Markdown!\n </div>\n <a href=\"/\" class=\"p-4 underline hover:text-purple-500 transition-colors ease-in-out duration-200\">\n  Go home\n </a>\n</div>";

				const frontmatter = {"title":"Markdown + Tailwind","layout":"../layouts/main.astro"};
				const file = "/workspaces/astro-portfolio/src/pages/markdown-page.md";
				const url = "/markdown-page";
				function rawContent() {
					return "   \n                            \n                             \n   \n\n<div class=\"grid place-items-center h-screen content-center\">\n <div class=\"py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md\">\n  Tailwind classes also work in Markdown!\n </div>\n <a\n  href=\"/\"\n  class=\"p-4 underline hover:text-purple-500 transition-colors ease-in-out duration-200\"\n >\n  Go home\n </a>\n</div>\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Main, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html())}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
