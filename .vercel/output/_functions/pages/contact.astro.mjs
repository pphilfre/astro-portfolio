import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute, e as createAstro } from '../chunks/astro/server_DfsTNRNX.mjs';
import 'piccolore';
/* empty css                                         */
import { c as cn, N as Navbar } from '../chunks/Navbar_KjT06Vy-.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, MessageSquare, Github, Loader2, CheckCircle2, Send } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
export { renderers } from '../renderers.mjs';

function ContactCard({ children, href, external = false, className = "" }) {
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        target: external ? "_blank" : void 0,
        rel: external ? "noopener noreferrer" : void 0,
        className: `block bg-secondary rounded-lg border border-border hover:border-foreground/20 transition-all hover:scale-[1.02] ${className}`,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx("article", { className: `bg-secondary rounded-lg border border-border ${className}`, children });
}
function ContactBento() {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
    /* @__PURE__ */ jsx(
      ContactCard,
      {
        href: "mailto:contact@freddiephilpot.dev",
        className: "col-span-2 p-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-background/50 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-sm truncate", children: "contact@freddiephilpot.dev" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ContactCard,
      {
        href: "https://www.linkedin.com/in/freddiephilpot/",
        external: true,
        className: "p-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-background/50 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "LinkedIn" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Professional" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(ContactCard, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 bg-background/50 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-foreground" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Open to" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Apprenticeships & collabs" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ContactCard,
      {
        href: "https://github.com/pphilfre",
        external: true,
        className: "col-span-2 p-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-background/50 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "GitHub" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent font-medium", children: "Personal" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "@pphilfre · Projects & school work" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ContactCard,
      {
        href: "https://github.com/philfreddie",
        external: true,
        className: "col-span-2 p-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-background/50 rounded-lg shrink-0", children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5 text-foreground" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "GitHub" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-accent font-medium", children: "Production" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "@philfreddie · Production code & writeups" })
          ] })
        ] })
      }
    )
  ] });
}

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      "data-slot": "label",
      className: cn(labelVariants(), className),
      ...props
    }
  );
}

function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
        className
      ),
      ...props
    }
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

function ContactForm({
  turnstileSiteKey = "0x4AAAAAACYIXwKzjELumsak"
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);
  useEffect(() => {
    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current) return;
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
        }
      }
      turnstileRef.current.innerHTML = "";
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => {
          setCaptchaToken(token);
        },
        "expired-callback": () => {
          setCaptchaToken(null);
        },
        theme: isDark ? "dark" : "light"
      });
    };
    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        clearInterval(checkTurnstile);
        renderWidget();
      }
    }, 100);
    return () => {
      clearInterval(checkTurnstile);
    };
  }, [turnstileSiteKey, isDark]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          captchaToken
        })
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setCaptchaToken(null);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3e3);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const isFormValid = name.trim() && email.trim() && message.trim() && captchaToken;
  return /* @__PURE__ */ jsxs("div", { className: "bg-secondary rounded-lg border border-border p-6 mt-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Send a Message" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              placeholder: "Your name",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              disabled: isSubmitting
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "your@email.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              disabled: isSubmitting
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Message" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "message",
            placeholder: "Your message...",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            required: true,
            disabled: isSubmitting
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: turnstileRef,
            className: "cf-turnstile"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            disabled: !isFormValid || isSubmitting,
            className: `min-w-[140px] transition-all duration-300 ${isSuccess ? "bg-green-600 hover:bg-green-600" : ""}`,
            children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
              "Sending..."
            ] }) : isSuccess ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 animate-[scale-in_0.3s_ease-out]" }),
              "Sent!"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
              "Send Message"
            ] })
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-destructive text-sm", children: error })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
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
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><meta name="description" content="Get in touch with Freddie Philpot. Open to apprenticeships, collaborations, and cybersecurity opportunities."><title>Contact | Freddie Philpot</title><script>
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
		<\/script>`, '</head> <body class="bg-background text-foreground min-h-screen"> ', ' <main class="pt-24 px-4 max-w-5xl mx-auto pb-16"> <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact</h1> <p class="text-muted-foreground mb-8">Get in touch</p> ', " ", " </main> </body></html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/Navbar.tsx", "client:component-export": "default" }), renderComponent($$result, "ContactBento", ContactBento, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/ContactBento.tsx", "client:component-export": "ContactBento" }), renderComponent($$result, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/astro-portfolio/src/components/ContactForm.tsx", "client:component-export": "ContactForm" }));
}, "/workspaces/astro-portfolio/src/pages/contact.astro", void 0);

const $$file = "/workspaces/astro-portfolio/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
